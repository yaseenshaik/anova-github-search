import { Box, TextInput } from 'grommet'
import { Search } from 'grommet-icons'

interface IProps {
  search?: string
  onKeyDown?: React.KeyboardEventHandler
  onChange?: React.ChangeEventHandler
}

const SearchField = ({ search, onKeyDown, onChange }: IProps) => (
  <Box width={{ max: 'large' }} fill align="center" justify="start" pad="small">
    <TextInput
      value={search}
      icon={<Search />}
      reverse
      onKeyDownCapture={onKeyDown}
      onChange={onChange}
      placeholder="search repo..."
    />
  </Box>
)

export default SearchField
