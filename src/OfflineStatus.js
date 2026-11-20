import React from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen'

// Chrome fires beforeinstallprompt once, often before the home page renders, so catch it at module load.
let installPrompt
const installListeners = new Set()
const notifyInstall = () => installListeners.forEach((f) => f())
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault() // we offer our own button instead of Chrome's mini-infobar
  installPrompt = e
  notifyInstall()
})
window.addEventListener('appinstalled', () => {
  installPrompt = null
  notifyInstall()
})

const isInstalled = () => window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true
// iOS has no install prompt API; people add it from the Share sheet. (iPadOS reports itself as a Mac.)
const isIos = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

function InstallButton() {
  const [, rerender] = React.useReducer((n) => n + 1, 0)
  const [showIosHelp, setShowIosHelp] = React.useState(false)
  React.useEffect(() => {
    installListeners.add(rerender)
    return () => installListeners.delete(rerender)
  }, [])

  if (isInstalled() || (!installPrompt && !isIos())) return null

  const install = async () => {
    if (!installPrompt) return setShowIosHelp((s) => !s)
    installPrompt.prompt()
    await installPrompt.userChoice.catch(() => {})
    installPrompt = null // a prompt can only be used once
    rerender()
  }
  return (
    <>
      <Button size='small' variant='outlined' startIcon={<AddToHomeScreenIcon />} onClick={install} className='!ml-2'>
        Add to home screen
      </Button>
      {showIosHelp && (
        <span className='basis-full mt-1'>
          In Safari, tap <strong>Share</strong> (the square with an arrow), then <strong>Add to Home Screen</strong>.
          Installed, it keeps its offline copy even if you don’t open it for a while.
        </span>
      )}
    </>
  )
}

// Tells people whether the app is ready to use with no signal: the app and map first (service worker
// installed), then the videos, which the service worker downloads afterwards and reports progress for.
export default function OfflineStatus() {
  const [appReady, setAppReady] = React.useState(false)
  const [videos, setVideos] = React.useState(null) // { done, total, finished }

  React.useEffect(() => {
    const sw = navigator.serviceWorker
    if (!sw || process.env.NODE_ENV !== 'production') return // dev registers no service worker
    const onMessage = ({ data }) => data?.type === 'videoProgress' && setVideos(data)
    // replies with progress; already-cached videos count straight away. Re-sent when signal returns or the app
    // comes back to the foreground, so a run stopped by losing signal (or a killed worker) resumes without a restart.
    const cacheVideos = () =>
      sw.ready.then((reg) => {
        setAppReady(true)
        reg.active?.postMessage('cacheVideos')
      })
    const onVisible = () => document.visibilityState === 'visible' && cacheVideos()
    sw.addEventListener('message', onMessage)
    window.addEventListener('online', cacheVideos)
    document.addEventListener('visibilitychange', onVisible)
    cacheVideos()
    return () => {
      sw.removeEventListener('message', onMessage)
      window.removeEventListener('online', cacheVideos)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  if (!navigator.serviceWorker || process.env.NODE_ENV !== 'production') return null

  const spinner = <CircularProgress size={16} className='mr-2 shrink-0' />
  let content
  if (!appReady) content = <>{spinner}Saving the app for offline use — keep it open while you have signal…</>
  else if (videos && videos.done >= videos.total)
    content = (
      <>
        <CheckCircleIcon fontSize='small' className='mr-2 text-green-700' />
        Ready to use offline
      </>
    )
  else if (videos?.finished)
    content = <>Trips and map ready offline. Videos will finish downloading next time you open the app with signal.</>
  else
    content = (
      <>
        {spinner}Trips and map ready offline. Downloading videos{videos ? ` (${videos.done}/${videos.total})` : ''}…
      </>
    )

  return (
    <div className='max-w-md mb-4 flex flex-wrap items-center gap-y-2 text-sm'>
      <p className='flex items-center' role='status'>
        {content}
      </p>
      <InstallButton />
    </div>
  )
}
