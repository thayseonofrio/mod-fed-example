
const loadProfileContainer = () => async () => {
    await __webpack_init_sharing__("default")
    const profileAppContainer = window.profile
    await profileAppContainer.init(__webpack_share_scopes__.default)
    const module = await profileAppContainer.get("./App")
    return module()
}

export default loadProfileContainer



