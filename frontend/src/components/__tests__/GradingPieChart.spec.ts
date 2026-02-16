import type { GradingItem } from '@/types'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GradingPieChart from '../GradingPieChart.vue'

const mockGradingItems: GradingItem[] = [
  { label: '作業', percentage: 30 },
  { label: '期中考', percentage: 30 },
  { label: '期末考', percentage: 40 },
]

describe('gradingPieChart', () => {
  it('renders title', () => {
    const wrapper = mount(GradingPieChart, {
      props: { items: mockGradingItems },
    })
    expect(wrapper.text()).toContain('配分方式')
  })

  it('renders all grading items in legend', () => {
    const wrapper = mount(GradingPieChart, {
      props: { items: mockGradingItems },
    })
    expect(wrapper.text()).toContain('作業 30%')
    expect(wrapper.text()).toContain('期中考 30%')
    expect(wrapper.text()).toContain('期末考 40%')
  })

  it('renders SVG pie chart', () => {
    const wrapper = mount(GradingPieChart, {
      props: { items: mockGradingItems },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders correct number of path segments', () => {
    const wrapper = mount(GradingPieChart, {
      props: { items: mockGradingItems },
    })
    const paths = wrapper.findAll('path')
    expect(paths.length).toBe(3)
  })

  it('renders legend items with color dots', () => {
    const wrapper = mount(GradingPieChart, {
      props: { items: mockGradingItems },
    })
    const dots = wrapper.findAll('.pie-chart__dot')
    expect(dots.length).toBe(3)
  })

  it('handles empty items array', () => {
    const wrapper = mount(GradingPieChart, {
      props: { items: [] },
    })
    expect(wrapper.findAll('path').length).toBe(0)
  })

  it('handles single item', () => {
    const singleItem: GradingItem[] = [{ label: '期末考', percentage: 100 }]
    const wrapper = mount(GradingPieChart, {
      props: { items: singleItem },
    })
    expect(wrapper.text()).toContain('期末考 100%')
    expect(wrapper.findAll('path').length).toBe(1)
  })
})
