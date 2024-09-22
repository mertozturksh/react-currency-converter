
const Input = ({ title, type, value, disabled, onChange }) => {
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700"
      >
        {title}:
      </label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        disabled={disabled}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
      />
    </div>
  )
}

export default Input