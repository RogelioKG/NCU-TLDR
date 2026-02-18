import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import WishingWell from '../WishingWell.vue'

describe('wishingWell', () => {
  it('renders title', () => {
    const wrapper = mount(WishingWell)
    expect(wrapper.text()).toContain('許願池')
  })

  it('renders wish list items', () => {
    const wrapper = mount(WishingWell)
    const items = wrapper.findAll('.wishing-well__item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('renders course names and teachers', () => {
    const wrapper = mount(WishingWell)
    const items = wrapper.findAll('.wishing-well__item')
    items.forEach((item) => {
      expect(item.find('.wishing-well__course-name').exists()).toBe(true)
      expect(item.find('.wishing-well__teacher').exists()).toBe(true)
    })
  })

  it('renders item numbers', () => {
    const wrapper = mount(WishingWell)
    const numbers = wrapper.findAll('.wishing-well__number')
    numbers.forEach((num, idx) => {
      expect(num.text()).toBe(`${idx + 1}.`)
    })
  })

  it('applies hover class on mouseenter', async () => {
    const wrapper = mount(WishingWell)
    const firstItem = wrapper.find('.wishing-well__item')
    await firstItem.trigger('mouseenter')
    expect(firstItem.classes()).toContain('wishing-well__item--hovered')
  })

  it('removes hover class on mouseleave', async () => {
    const wrapper = mount(WishingWell)
    const firstItem = wrapper.find('.wishing-well__item')
    await firstItem.trigger('mouseenter')
    await firstItem.trigger('mouseleave')
    expect(firstItem.classes()).not.toContain('wishing-well__item--hovered')
  })

  it('emits select-course event when item is clicked', async () => {
    const wrapper = mount(WishingWell)
    const firstItem = wrapper.find('.wishing-well__item')
    await firstItem.trigger('click')
    expect(wrapper.emitted('selectCourse')).toBeTruthy()
  })

  it('renders add button with image', () => {
    const wrapper = mount(WishingWell)
    const addBtn = wrapper.find('.wishing-well__add-btn')
    expect(addBtn.exists()).toBe(true)
    expect(addBtn.find('img').exists()).toBe(true)
  })

  it('renders background cards for stacking effect', () => {
    const wrapper = mount(WishingWell)
    expect(wrapper.find('.wishing-well__bg-card--1').exists()).toBe(true)
    expect(wrapper.find('.wishing-well__bg-card--2').exists()).toBe(true)
  })
})
