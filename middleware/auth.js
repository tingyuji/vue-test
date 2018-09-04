export default function ({store, redirect}) {
  if (!(store.state.userInfo && store.state.userInfo.userId)) {
    return redirect('/login')
  }
}
