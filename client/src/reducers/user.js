// import { UPDATE_FOLLOWERS, UPDATE_FOLLOWING } from '../actions/types';

// const initialState = {
//   posts: [],
//   post: null,
//   loading: true,
//   errors: {},
// };

// export default function (state = initialState, action) {
//   const { type, payload } = action;

//   switch (type) {
//     case UPDATE_FOLLOWERS:
//       return {
//         ...state,
//         posts: state.posts.map((post) =>
//           post._id === payload.id ? { ...post, likes: payload.likes } : post
//         ),
//       };
//     case UPDATE_FOLLOWING:
//       return {
//         ...state,
//         posts: state.posts.map((post) =>
//           post._id === payload.id ? { ...post, likes: payload.likes } : post
//         ),
//       };
//     default:
//       return state;
//   }
// }
