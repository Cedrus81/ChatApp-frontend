
type LoadingWheelProps = {
    title: string
}
function LoadingWheel({title}: LoadingWheelProps) {
  return (
    <div className="loading-wheel-container" data-theme="headline">
        <h2>{title}</h2>
        <svg>
            <circle cx="60" cy="60" r="60"></circle>
        </svg>
    </div>
  )
}

export default LoadingWheel