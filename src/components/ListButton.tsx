type Props = {
  icon: React.ComponentType<React.ComponentProps<'svg'>>
  label: string
}

const ListButton = ({ icon: Icon, label }: Props) => {
  return (
    <div>
      <input
        type='radio'
        id={label}
        name='list-category'
        className='peer hidden'
      />
      <label
        htmlFor={label}
        className='flex cursor-pointer flex-col items-center bg-gray-100 p-10 text-black peer-checked:bg-pink-500 peer-checked:text-white'
      >
        <Icon fontSize={28} />
        <span className='mt-2'>{label}</span>
      </label>
    </div>
  )
}

export default ListButton