import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SearchBar from '../SearchBar.vue'

describe('searchBar', () => {
  it('renders search input', () => {
    const wrapper = mount(SearchBar)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('displays placeholder text', () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('搜尋課程、教師、關鍵字...')
  })

  it('updates search query on input', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')
    await input.setValue('資料結構')
    expect((input.element as HTMLInputElement).value).toBe('資料結構')
  })

  it('emits search event on Enter key', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')
    await input.setValue('資料結構')
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')?.[0]).toEqual(['資料結構'])
  })

  it('does not emit search event when query is empty', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')
    await input.setValue('   ')
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('search')).toBeFalsy()
  })

  it('shows clear button when input has value', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')
    await input.setValue('test')
    expect(wrapper.find('.search-bar__clear').exists()).toBe(true)
  })

  it('hides clear button when input is empty', () => {
    const wrapper = mount(SearchBar)
    expect(wrapper.find('.search-bar__clear').exists()).toBe(false)
  })

  it('clears input when clear button is clicked', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')
    await input.setValue('test')
    await wrapper.find('.search-bar__clear').trigger('click')
    expect((input.element as HTMLInputElement).value).toBe('')
  })

  it('applies focused class on focus', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')
    await input.trigger('focus')
    expect(wrapper.find('.search-bar').classes()).toContain('search-bar--focused')
  })

  it('removes focused class on blur', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')
    await input.trigger('focus')
    await input.trigger('blur')
    expect(wrapper.find('.search-bar').classes()).not.toContain('search-bar--focused')
  })
})
