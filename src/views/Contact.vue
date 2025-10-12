<script setup lang="ts">
import MenuBar from '../components/MenuBar.vue'
import Title from '../components/Title.vue'

import { reactive } from 'vue'
import { ElNotification, ElForm, ElButton, ElInput, ElSelect, ElFormItem, ElOption } from 'element-plus'

var server_url = ""
if (import.meta.env.DEV) {
    server_url = "http://localhost:8080"
}


const form = reactive({
    type: 'bug',
    email: '',
    message: '',
})

const goFeedback = () => {
    if (form.email == undefined || form.email == '') {
        feedbackError1('请输入邮箱')
        return
    }
    if (form.message == undefined || form.message == '') {
        feedbackError1('请输入反馈内容')
        return
    }

    const feedbackInfo = JSON.stringify({
        type: form.type,
        email: form.email,
        message: form.message,
    });
    feedbackIt(feedbackInfo);
}

const feedbackOptions = [
    {
        value: 'bug',
        label: 'Bug反馈',
    },
    {
        value: 'crash',
        label: '崩溃反馈',
    },
    {
        value: 'logic',
        label: '逻辑反馈',
    },
    {
        value: 'suggest',
        label: '建议反馈',
    },
    {
        value: 'other',
        label: '其他',
    },
]

const feedbackError = (whyerr: string) => {
    ElNotification({
        title: '错误',
        message: '提交时出现错误，请稍后再试。\n错误原因:' + whyerr,
        type: 'error',
    })
}

const feedbackError1 = (whyerr: string) => {
    ElNotification({
        title: '错误',
        message: whyerr,
        type: 'error',
    })
}

const feedbackSuccess = (json: any) => {
    let message = json.detail;
    // 如果是列表，说明数据校验不通过
    if (json.detail instanceof Array) {
        message = json.detail[0].msg;
        ElNotification({
            title: '错误',
            message: message,
            type: 'error',
        })
    } else {
        ElNotification({
            title: '成功',
            message: json.detail,
            type: 'success',
        })
    }

}

const feedbackIt = (msg: string) => {
    console.log(msg);
    fetch(`${server_url}/feedback`, {
        method: 'POST', // 指定请求方法
        headers: {
            'Content-Type': 'application/json'
        },
        body: msg
    })
        .then(response => feedbackSuccess(response.json()))
        .catch(error => feedbackError(error.message));
}
</script>

<template>
    <MenuBar nav="4" />
    <div class="container">
        <Title>联系我们</Title>
        <div class="feedback-form">
            <el-form :model="form" label-width="auto" style="max-width: 630px">
                <el-form-item label="反馈类型">
                    <el-select v-model="form.type" placeholder="Select" style="width: 275px">
                        <el-option v-for="item in feedbackOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="您的邮箱">
                    <el-input v-model="form.email" style="width: 275px;" placeholder="请输入邮箱" />
                </el-form-item>
                <el-form-item label="反馈内容">
                    <el-input v-model="form.message" style="width: 275px;" autosize type="textarea"
                        placeholder="输入内容" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="goFeedback">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
.feedback-form {
    display: flex;
    justify-content: center;
}
</style>