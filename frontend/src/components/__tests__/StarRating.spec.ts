import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import StarRating from '../StarRating.vue'

describe('StarRating', () => {
  it('renders label when provided', () => {
    const wrapper = mount(StarRating, {
      props: { rating: 3, label: '教師風格' },
    })
    expect(wrapper.text()).toContain('教師風格')
  })

  it('renders without label when not provided', () => {
    const wrapper = mount(StarRating, {
      props: { rating: 4 },
    })
    expect(wrapper.find('.star-rating__label').exists()).toBe(false)
  })

  it('applies size class', () => {
    const wrapper = mount(StarRating, {
      props: { rating: 2, size: 'lg' },
    })
    expect(wrapper.find('.star-rating').classes()).toContain('star-rating--lg')
  })
})
