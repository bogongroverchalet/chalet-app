export default function Wrapper({ children }) {
  return (
    <div className='flex min-h-full w-full items-center justify-center flex-col max-sm:p-3'>
      <div className='text-left max-w-lg'>{children}</div>
    </div>
  )
}
