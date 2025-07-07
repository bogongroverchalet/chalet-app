import FormControlLabel from '@mui/material/FormControlLabel'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Tooltip from '@mui/material/Tooltip'
import classnames from 'classnames'
import { useEffect, useRef, useMemo } from 'react'
import { useLocalStorage, useBoolean, useClickAnyWhere } from 'usehooks-ts'
import Checkbox from '@mui/material/Checkbox'

export const YEAR = 2025

export function Item({ label, resetStorageEventEmitter, info, optional }) {
  const [checked, setChecked, removeValue] = useLocalStorage(`${YEAR}-${label}`, false)
  useEffect(() => {
    resetStorageEventEmitter.on('resetStorage', removeValue)
    return () => resetStorageEventEmitter.removeListener('resetStorage', removeValue)
  }, [removeValue, resetStorageEventEmitter])

  label = useMemo(
    () =>
      optional ? (
        <Tooltip title={<span className='text-lg'>Optional item.</span>} arrow>
          <span className='italic'>{label}</span>
        </Tooltip>
      ) : (
        label
      ),
    [optional, label]
  )

  return (
    <li>
      <InfoIcon {...{ info }} />
      <FormControlLabel control={<Checkbox onChange={() => setChecked(!checked)} {...{ checked }} />} {...{ label }} />
    </li>
  )
}

export function InfoIcon({ info }) {
  const { value, setTrue, setFalse, toggle } = useBoolean(false)
  const toggleRef = useRef()
  useClickAnyWhere((e) => toggleRef.current.contains(e.target) || setFalse())

  return (
    <>
      <span
        ref={toggleRef}
        onTouchStart={() => toggle()}
        onMouseEnter={() => setTrue()}
        onMouseLeave={() => setFalse()}
        className={classnames(info ? '' : 'invisible', 'mr-1', 'cursor-pointer', '-ml-7')}
      >
        <Tooltip title={<div className='text-lg'>{info}</div>} arrow open={value}>
          <InfoOutlinedIcon />
        </Tooltip>
      </span>
    </>
  )
}

export function DontItem({ label, info }) {
  return (
    <li>
      <InfoIcon {...{ info }} />
      <FormControlLabel className='!cursor-not-allowed' control={<span className='p-[9px]'>❌</span>} {...{ label }} />
    </li>
  )
}
