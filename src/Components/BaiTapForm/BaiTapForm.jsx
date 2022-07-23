import React, { Component } from 'react'
import RegisterForm from './RegisterForm'
import UserManagement from './UserManagement'

export default class BaiTapForm extends Component {
    render() {
        return (
            <div className="w-75 mx-auto">
                <RegisterForm />
                <UserManagement />
            </div>

        )
    }
}
