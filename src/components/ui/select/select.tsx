import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'

import { ReactComponent as ArrowDrowdownIcon } from 'assets/images/arrow-dropdown.svg'
import { ReactComponent as ExitIcon } from 'assets/images/exit.svg'
import { ReactComponent as SearchIcon } from 'assets/images/search.svg'

import type { MultiSelectProps, Option, SingleSelectProps } from 'types/select'

import styles from './select.module.scss'

type Props = SingleSelectProps | MultiSelectProps

export const Select: React.FC<Props> = ({
    onChange,
    options,
    isDisabled = false,
    isSearchable = false,
    isClearable,
    value,
    closeMenuOnSelect = true,
    isMultiple,
    placeholder
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const handleClick = () => setIsOpen((prev) => !prev)

    const close = () => {
        setIsOpen(false)
    }

    const clearOptions = (e: React.MouseEvent) => {
        e.stopPropagation()
        isMultiple ? onChange([]) : onChange(undefined)
        setSearchTerm('')
    }

    const selectOption = (option: Option) => {
        if (isMultiple) {
            if (value?.map((value) => value.value).includes(option.value)) {
                onChange(value.filter((value) => value.value !== option.value))
            } else {
                onChange([...value, option])
            }
        } else {
            if (option.value !== value?.value) onChange(option)
        }
    }

    const isOptionSelected = (option: Option) =>
        isMultiple
            ? value?.map((value) => value.value).includes(option.value)
            : option === value

    const filteredOptions = options?.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const containerClass = cn(styles.container, { [styles.disabled]: isDisabled })

    const isValueSelected = isMultiple
        ? value.length
        : value?.value !== null && value?.value !== undefined

    const selectRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                isOpen &&
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                close()
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [isOpen])

    return (
        <div
            onClick={handleClick}
            tabIndex={0}
            ref={selectRef}
            className={containerClass}>
            <div className={styles.values}>
                <span>
                    {isMultiple ? (
                        <span className={styles['option-badges']}>
                            {value?.length ? (
                                value?.map((value) => (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            selectOption(value)
                                        }}
                                        key={value.value}
                                        className={styles['option-badge']}>
                                        <span>{value.label}</span>
                                        <span>
                                            <ExitIcon />
                                        </span>
                                    </button>
                                ))
                            ) : (
                                <span className={styles.placeholder}>{placeholder}</span>
                            )}
                        </span>
                    ) : value?.label ? (
                        <span className={styles.value}>{value?.label}</span>
                    ) : (
                        <span className={styles.placeholder}>{placeholder}</span>
                    )}
                </span>
                <span className={styles.controls}>
                    {isClearable && isValueSelected ? (
                        <span className={styles['clear-options']} onClick={clearOptions}>
                            <ExitIcon />
                        </span>
                    ) : (
                        ''
                    )}
                    <ArrowDrowdownIcon />
                </span>
            </div>
            {isOpen ? (
                <ul className={styles.options}>
                    {isSearchable ? (
                        <li
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                            className={styles['search-container']}>
                            <span className={styles.search}>
                                <span className={styles['search-icon']}>
                                    <SearchIcon />
                                </span>
                                <input
                                    className={styles['search-input']}
                                    type='search'
                                    value={searchTerm}
                                    onChange={onSearch}
                                    placeholder='Search'
                                    autoComplete='off'
                                />
                            </span>
                        </li>
                    ) : (
                        ''
                    )}
                    {filteredOptions?.map((option) => (
                        <li
                            onClick={(e) => {
                                e.stopPropagation()
                                selectOption(option)
                                if (closeMenuOnSelect) {
                                    close()
                                }
                            }}
                            className={`${styles.option} ${
                                isOptionSelected(option) ? styles.selected : ''
                            }`}
                            key={option.value}>
                            {option.label}
                        </li>
                    ))}
                    {filteredOptions?.length ? (
                        ''
                    ) : (
                        <li className={styles['no-results']}>No such account</li>
                    )}
                </ul>
            ) : (
                ''
            )}
        </div>
    )
}
