from contextlib import asynccontextmanager
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Literal, Optional
import orjson
import aiofiles
import os
from datetime import datetime

# 定义反馈数据模型
class FeedbackItem(BaseModel):
    type: Literal['bug', 'crash', 'logic', 'suggest', 'other']
    email: EmailStr
    message: str
    timestamp: Optional[str] = None

class FeedbackResponse(BaseModel):
    message: str

@asynccontextmanager
async def life_cycle(app: FastAPI):
    await ensure_feedback_file()
    yield


# 创建FastAPI应用
app = FastAPI(
    title="Feedback API",
    description="异步反馈收集API",
    version="1.0.0",
    lifespan=life_cycle,
    openapi_url="",
    docs_url="",
    redoc_url="",
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 根据你的前端地址调整
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 反馈数据文件路径
FEEDBACK_FILE = "feedback.json"
BASE_DIRECTORY = "dist"

def get_safe_path(requested_path: str) -> Path:
    """安全地获取文件路径，防止目录遍历攻击"""
    base_path = Path(BASE_DIRECTORY).resolve()
    requested_path_p = Path(requested_path.strip("/"))
    full_path = (base_path / requested_path_p).resolve()

    # 确保路径在基础目录内
    if base_path not in full_path.parents and full_path != base_path:
        raise HTTPException(status_code=403, detail="访问被拒绝")

    return full_path

async def ensure_feedback_file():
    """确保反馈文件存在"""
    if not os.path.exists(FEEDBACK_FILE):
        async with aiofiles.open(FEEDBACK_FILE, 'wb') as f:
            await f.write(orjson.dumps([], option=orjson.OPT_INDENT_2))

async def read_feedback_from_file() -> List[dict]:
    """从文件读取反馈数据"""
    await ensure_feedback_file()
    try:
        async with aiofiles.open(FEEDBACK_FILE, 'r', encoding='utf-8') as f:
            content = await f.read()
            return orjson.loads(content) if content.strip() else []
    except (orjson.JSONDecodeError, FileNotFoundError):
        return []

async def write_feedback_to_file(feedback_list: List[dict]):
    """将反馈数据写入文件"""
    async with aiofiles.open(FEEDBACK_FILE, 'wb') as f:
        await f.write(orjson.dumps(feedback_list, option=orjson.OPT_INDENT_2))

@app.post("/feedback", response_model=FeedbackResponse)
async def submit_feedback(feedback: FeedbackItem):
    """
    提交反馈
    """
    try:
        # 添加时间戳
        feedback.timestamp = datetime.now().isoformat()

        # 读取现有反馈
        feedback_list = await read_feedback_from_file()

        # 添加新反馈
        feedback_list.append(feedback.model_dump())

        # 写入文件
        await write_feedback_to_file(feedback_list)

        return FeedbackResponse(message="反馈提交成功")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"提交反馈时出错: {str(e)}")

@app.get("/feedback", response_model=List[FeedbackItem])
async def get_all_feedback():
    """
    获取所有反馈
    """
    try:
        feedback_list = await read_feedback_from_file()
        return feedback_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取反馈时出错: {str(e)}")

@app.get("/feedback/{feedback_type}", response_model=List[FeedbackItem])
async def get_feedback_by_type(feedback_type: Literal['bug', 'crash', 'logic', 'suggest', 'other']):
    """
    根据类型获取反馈
    """
    try:
        feedback_list = await read_feedback_from_file()
        filtered_feedback = [item for item in feedback_list if item.get('type') == feedback_type]
        return filtered_feedback
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取反馈时出错: {str(e)}")

@app.get("/{file_path:path}")
async def root(file_path: str):
    full_path = get_safe_path(file_path)
    if os.path.exists(file_path):
        return FileResponse(full_path)
    else:
        return FileResponse(get_safe_path("index.html"))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8080,
    )