import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserManagement extends Component {
  state = {
    keyword:"",
  }

  renderUserList = () => {
    let data = this.props.userList.filter((ele)=>{
      return ele.userName.toLowerCase().trim().indexOf(this.state.keyword.toLowerCase().trim()) !== -1
    });

    return data.map((ele, idx) => {
      const { maSV, userName, phoneNumber, email } = ele;
      return (
        <tr key={idx} >
          <td>{maSV}</td>
          <td>{userName}</td>
          <td>{phoneNumber}</td>
          <td>{email}</td>
          <td>
            <button onClick={() => {
              this.props.dispatch({
                type: "SET_SELECTED_USER",
                payload: ele,
              })
            }} className="btn btn-info">Sửa</button>
            <button onClick={() => this.props.dispatch({
              type: "DELETE_USER",
              payload: ele.id,
            })} className="btn btn-danger">Xóa</button>
          </td>
        </tr>
      );
    });
  };

  handleChange =(event)=>{
    const{name,value} = event.target;
    this.setState({
      [name]:value,
    })
  }

  render() {
    return (
      <div className="card mt-5">
        <div className="card-header bg-dark">
          <p className="m-0 text-white font-weight-bold">Danh sách sinh viên</p>
        </div>
        <div className="col-5">
          <div className="form-group mt-4">
            <input 
            type="text" 
            className="form-control" 
            onChange={this.handleChange}
            name="keyword"
            placeholder="Nhập tên sinh viên cần tìm" />
          </div>
        </div>
        <div className="row px-3">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Mã SV</th>
                  <th>Họ và tên</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
                {this.renderUserList()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.userReducer,
  };
}
export default connect(mapStateToProps)(UserManagement);