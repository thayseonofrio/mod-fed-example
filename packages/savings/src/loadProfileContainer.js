const shouldLoadProfileApp = true
const remoteUrl = "http://localhost:3002/remoteEntry.js"

const fetchRemote = () => 
  new Promise((resolve, reject) => {
    if (!shouldLoadProfileApp) {
      resolve();
      return;
    }
    const getProxy = () => ({
      get: (request) => window.profile.get(request),
      init: (argument) => {
        try {
          return window.profile.init(argument);
        } catch {
          console.error("remote container already initialized");
        }
      },
    });

    const script = document.createElement("script");
    script.src = remoteUrl;
    script.addEventListener("load", () => {
      resolve(getProxy());
    });
    script.addEventListener("error", () => {
        console.error("unable to load remote container")
    })
    document.head.append(script)
  });

const loadProfileContainer = () => async () => {

    if (!window.profile) {
        await __webpack_init_sharing__("default")
        const profileAppRemote = await fetchRemote()
        await profileAppRemote.init(__webpack_share_scopes__.default)
    }

    const profileAppContainer = window.profile
    const module = await profileAppContainer.get("./App")
    return module()
}

export default loadProfileContainer



