import { storageService } from "./async-storage.service";
import { httpService } from './http.service'
import { store } from "../store/store";
import {
  socketService,
  SOCKET_EVENT_USER_UPDATED,
  SOCKET_EMIT_USER_WATCH,
} from "./socket.service";
import { showSuccessMsg } from "../services/event-bus.service";

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
  getLikedSongs,
  addLikedSong,
  removeLikedSong,
};

window.userService = userService;

function getUsers() {
  // return storageService.query("user");
  return httpService.get("user")
}

async function getById(userId) {
  // const user = await storageService.get("user", userId);
  const user = await httpService.get(`user/${userId}`)

  socketService.emit(SOCKET_EMIT_USER_WATCH, userId);
  // socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
  // socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

  return user;
}

function remove(userId) {
  // return storageService.remove("user", userId);
  return httpService.delete(`user/${userId}`)
}

async function update(user) {
  // await storageService.put("user", user);
  user = await httpService.put(`user/${user._id}`, user)
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) saveLocalUser(user);
  return user;
}

async function login(userCred) {
  console.log('userCred', userCred)
  // const users = await httpService.get("user")
  // let user = users.find((user) => user.username === userCred.username)
  // console.log('usersusersusersusersusers', user)
  const user = await httpService.post('auth/login', userCred)
  console.log('user', user);
  if (user) {
    // socketService.login(user._id)
    return saveLocalUser(user);
  }
  return Promise.reject("abcdef u and your mom")
}

async function signup(userCred) {
  const users = await httpService.get("user");
  const isUser = users.find((user) => user.username === userCred.username);
  if (isUser) {
    return Promise.reject("username is already taken");
  }
  userCred.likedSongs = []
  // const user = await storageService.post("user", userCred);

  const user = await httpService.post('auth/signup', userCred)
  socketService.login(user._id);
  return saveLocalUser(user);
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
  socketService.logout();
  return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLoggedinUser() {
  let user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
  return user;
}

async function addLikedSong(song) {
  await storageService.post("likedSongs", song);
}

async function removeLikedSong(song) {
  await storageService.remove("likedSongs", song);
}

async function getLikedSongs() {
  return await storageService.query("likedSongs");
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()
