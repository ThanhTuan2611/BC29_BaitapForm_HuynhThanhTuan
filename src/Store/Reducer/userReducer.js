const DEFAULT_STATE = {
    userList: [
        {
            maSV: 1,
            userName: "Nguyễn Văn A",
            phoneNumber: "0915103649",
            email: "nguyenvana@gmail.com",
        },
        {
            maSV: 2,
            userName: "Nguyễn Văn B",
            phoneNumber: "0915103649",
            email: "nguyenvanb@gmail.com",
        }
    ],
    selectedUser: null,
};

export const userReducer = (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case "ADD_USER": {
            const data = [...state.userList];
            data.push({ ...payload, id: Date.now() });
            state.userList = data;

            return { ...state };
        }

        case "SET_SELECTED_USER": {

            return { ...state, selectedUser: payload };
        }

        case "UPDATE_USER": {
            // ** Cách 1:
            const data = [...state.userList];
            const idx = data.findIndex((ele) => ele.id === payload.id)
            if (idx !== -1) {
                data[idx] = payload;
            }
            state.userList = data;

            // ** Cách 2:
            // state.userList = state.userList.map((ele) => ele.id === payload.id ? payload : ele);

            state.selectedUser = null;
            return { ...state };
        }

        case "DELETE_USER": {
            // **Cách 1:
            const data = [...state.userList];

            const idx = data.findIndex((ele) => ele.id == payload);
            if (idx !== -1) {
                data.splice(idx, 1);
            };
            state.userList = data;

            // **Cách 2:
            // state.userList = state.userList.filter((ele) => ele.id !== payload)
            return { ...state };
        }

        default:
            return state;
    }
}