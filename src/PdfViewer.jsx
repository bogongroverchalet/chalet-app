import { useCallback, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useResizeObserver } from 'usehooks-ts'
import { Link, Navigate, useParams } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { useGesture } from '@use-gesture/react'
import registry from './pdfRegistry'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export default function PdfViewer() {
  const { slug } = useParams()
  const { file, title, backTo = '/' } = registry[slug] ?? {}
  const [numPages, setNumPages] = useState()
  const [containerWidth, setContainerWidth] = useState()
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState([0, 0])
  const offsetRef = useRef([0, 0])
  const containerRef = useRef()

  const onResize = useCallback((entries) => {
    const [entry] = entries
    if (entry) setContainerWidth(entry.contentRect.width)
  }, [])

  useResizeObserver({ ref: containerRef, onResize })

  const bind = useGesture(
    {
      onDrag: ({ offset: [dx, dy] }) => {
        offsetRef.current = [dx, dy]
        setOffset([dx, dy])
      },
      onPinch: ({ offset: [scale] }) => setZoom(Math.min(3, Math.max(0.5, scale))),
    },
    {
      drag: { from: () => offsetRef.current },
      pinch: { scaleBounds: { min: 0.5, max: 3 }, rubberband: true },
    }
  )

  if (!file) return <Navigate to='/' replace />

  return (
    <div className='grid grid-rows-[min-content,1fr] min-h-screen max-sm:p-3'>
      <div className='text-center max-sm:text-left'>
        <h1 className='text-3xl my-4 -indent-12 max-sm:pl-10'>
          <Link to={backTo}>
            <ChevronLeftIcon sx={{ fontSize: 40, position: 'relative', top: -3 }} />
            {title}
          </Link>
        </h1>
      </div>
      <div
        ref={containerRef}
        {...bind()}
        className='overflow-hidden touch-none cursor-grab active:cursor-grabbing'
      >
        <div
          style={{
            transform: `translate(${offset[0]}px, ${offset[1]}px) scale(${zoom})`,
            transformOrigin: 'top center',
          }}
          className='flex flex-col items-center'
        >
          <Document file={file} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
            {Array.from({ length: numPages ?? 0 }, (_, i) => (
              <Page
                key={`page_${i + 1}`}
                pageNumber={i + 1}
                width={containerWidth}
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  )
}
