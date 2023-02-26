export default function Wrapper({ children }) {
  return (
    <div className='flex h-full w-full items-center justify-center flex-col max-sm:p-3'>
      <div className='text-left max-w-md'>{children}</div>
    </div>
  )
}
