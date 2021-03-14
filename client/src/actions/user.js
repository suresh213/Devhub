import { UPDATE_FOLLOWERS, UPDATE_FOLLOWING } from './types';
import axios from 'axios';
import { toast } from 'react-toastify';

export const followUser = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/user/follow/${id}`);
    // dispatch({
    //   type: UPDATE_FOLLOWERS,
    //   payload: { id, likes: res.data },
    // });
  } catch (err) {
    // dispatch({
    //   type: UPDATE_FOLLOWERS,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};
export const unFollowUser = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/user/unfollow/${id}`);
    // dispatch({
    //   type: UPDATE_FOLLOWERS,
    //   payload: { id, likes: res.data },
    // });
  } catch (err) {
    // dispatch({
    //   type: UPDATE_FOLLOWERS,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};
