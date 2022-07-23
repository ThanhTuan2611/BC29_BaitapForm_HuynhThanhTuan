import React, { Component } from 'react'
import { createRef } from 'react';
import { connect } from 'react-redux';

const DEFAULT_VALUES = {
  maSV: "",
  userName: "",
  phoneNumber: "",
  email: "",
}
class RegisterForm extends Component {
  state = {
    values: DEFAULT_VALUES,
    errors: {
      maSV: "",
      userName: "",
      phoneNumber: "",
      email: "",
    }
  };

  formRef = createRef();

  static getDerivedStateFromProps(nextProps, currentState) {

    if (nextProps.selectedUser && currentState.values.maSV !== nextProps.selectedUser.maSV) {
      currentState.values = nextProps.selectedUser;
    }

    return currentState;
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      }
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (!event.target.checkValidity()) {
      return;
    }

    this.props.dispatch({
      type: this.props.selectedUser ? "UPDATE_USER" : "ADD_USER",
      payload: this.state.values,
    });

    this.setState({
      values: DEFAULT_VALUES,
    }, () => {
      this.forceUpdate();
    });
  };

  handleBlur = (event) => {
    const {
      name,
      title,
      minLength,
      maxLength,
      validity: { valueMissing, patternMismatch, tooLong, tooShort },
    } = event.target;

    // thay đổi giá trị mặc định của react
    let message = "";
    if (patternMismatch) {
      message = `(*) ${title} không đúng định dạng`
    }

    if (tooLong || tooShort) {
      message = `(*) ${title} không được ít quá ${minLength} kí tự hoặc vượt quá ${maxLength} kí tự`;
    }

    if (valueMissing) {
      message = `(*) ${title} không được bỏ trống`
    }

    // Đặt lại giá trị message
    this.setState({
      errors: {
        ...this.state.errors,
        [name]: message,
      },
    });
  };

  render() {
    const { maSV, userName, phoneNumber, email } = this.state.values || {};
    return (
      <div className="card mt-5">
        <div className="card-header bg-dark">
          <p className="m-0 font-weight-bold text-white">Thông tin sinh viên</p>
        </div>
        <div className="card-body">
          <form ref={this.formRef} noValidate onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Mã SV</label>
                  <input
                    type="text"
                    name="maSV"
                    required
                    title="Mã SV"
                    value={maSV}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    className="form-control" />
                  {this.state.errors.maSV && <span className="text-danger">{this.state.errors.maSV}</span>}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    name="userName"
                    required
                    title="Họ và tên"
                    value={userName}
                    minLength={4}
                    maxLength={30}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    className="form-control" />
                  {this.state.errors.userName && <span className="text-danger">{this.state.errors.userName}</span>}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    required
                    title="Số điện thoại"
                    value={phoneNumber}
                    pattern="^[0-9\-\+]{9,15}$"
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    className="form-control" />
                  {this.state.errors.phoneNumber && <span className="text-danger">{this.state.errors.phoneNumber}</span>}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    required
                    title="Email"
                    value={email}
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    className="form-control" />
                  {this.state.errors.email && <span className="text-danger">{this.state.errors.email}</span>}
                </div>
              </div>
            </div>
            <button
              disabled={!this.formRef.current?.checkValidity()} className="btn btn-success">Thêm sinh viên</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.userReducer,
  };
};
export default connect(mapStateToProps)(RegisterForm)
