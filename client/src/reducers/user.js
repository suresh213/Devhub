import { UPDATE_FOLLOWERS, UPDATE_FOLLOWING } from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  // console.log(state);
  switch (type) {
    case UPDATE_FOLLOWERS:
      return {
        ...state,
        profiles: state.profiles.map((profile) =>
          profile._id === payload.user1
            ? { ...profile, followers: payload.followers }
            : profile
        ),
      };
    case UPDATE_FOLLOWING:
      return {
        ...state,
        profiles: state.profiles.map((profile) =>
          profile._id === payload.user2
            ? { ...profile, following: payload.following }
            : profile
        ),
      };
    default:
      return state;
  }
}
