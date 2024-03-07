const operations = {
  editSwitch: false,
  styleSwitch: false,
  clickSwitch: false,
  darkSwitch: false,
  selectSwitch: false,
}

chrome.storage.local.get().then((data) => {
  if (!data?.operations) chrome.storage.local.set(operations)
})
