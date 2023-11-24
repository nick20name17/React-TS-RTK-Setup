export interface Option {
    label: string
    value: string
}

interface BaseProps {
    options: Option[]
    placeholder?: string
    isDisabled?: boolean
    isSearchable?: boolean
    closeMenuOnSelect?: boolean
    isClearable?: boolean
}

export interface SingleSelectProps extends BaseProps {
    isMultiple?: false
    onChange: (option: Option | undefined) => void
    value: Option | undefined
}

export interface MultiSelectProps extends BaseProps {
    isMultiple: true
    onChange: (option: Option[]) => void
    value: Option[]
}

