export default function Icon({ name, filled = false, className = '' }) {
  return (
    <span className={`material-symbols-outlined ${filled ? 'filled' : ''} ${className}`}>
      {name}
    </span>
  )
}
