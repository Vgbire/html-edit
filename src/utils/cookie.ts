export const xCookie = {
  get: function (sKey) {
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
              encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
              "\\s*\\=\\s*([^;]*).*$)|^.*$"
          ),
          "$1"
        )
      ) || null
    )
  },
  set: function (sKey, sValue, vEnd, sPath, sDomain?, bSecure?) {
    // eslint-disable-next-line no-useless-escape
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false
    }
    let sExpires = ""
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = "; max-age=" + vEnd
          break
        case String:
          sExpires = "; expires=" + vEnd
          break
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString()
          break
      }
    }
    document.cookie =
      encodeURIComponent(sKey) +
      "=" +
      encodeURIComponent(sValue) +
      sExpires +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "") +
      (bSecure ? "; secure" : "")
    return true
  },
  remove: function (sKey) {
    if (!sKey || !this.has(sKey)) {
      return false
    }
    const domainParts = window.location.hostname.split(".")
    domainParts.forEach((item, index) => {
      document.cookie =
        encodeURIComponent(sKey) +
        `=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domainParts
          .slice(index)
          .join(".")};`
    })
    document.cookie =
      encodeURIComponent(sKey) +
      `=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    return true
  },
  has: function (sKey) {
    return new RegExp(
      "(?:^|;\\s*)" +
        encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
        "\\s*\\="
    ).test(document.cookie)
  },
  keys: /* optional method: you can safely remove it! */ function () {
    const aKeys = document.cookie
      // eslint-disable-next-line no-useless-backreference, no-useless-escape
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
      // eslint-disable-next-line no-useless-escape
      .split(/\s*(?:\=[^;]*)?;\s*/)
    for (let nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx])
    }
    return aKeys
  }
}
