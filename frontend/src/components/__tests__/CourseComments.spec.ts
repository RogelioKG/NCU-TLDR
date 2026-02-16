import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CourseComments from '../CourseComments.vue'
import type { CourseComment } from '@/types'

const mockComments: CourseComment[] = [
  {
    id: 1,
    user: '匿名用戶A',
    title: '很棒的課程',
    content: '老師教得很好,收穫很多',
    date: '2024-01-15',
    likes: 10,
    dislikes: 2,
  },
  {
    id: 2,
    user: '匿名用戶B',
    title: '作業很多',
    content: '作業量偏大，需要花很多時間',
    date: '2024-01-20',
    likes: 5,
    dislikes: 1,
  },
]

describe('CourseComments', () => {
  it('renders title', () => {
    const wrapper = mount(CourseComments, {
      props: { comments: mockComments },
    })
    expect(wrapper.text()).toContain('匿名留言串')
  })

  it('renders all comments', () => {
    const wrapper = mount(CourseComments, {
      props: { comments: mockComments },
    })
    expect(wrapper.findAll('.comments__item').length).toBe(2)
  })

  it('renders comment user and title', () => {
    const wrapper = mount(CourseComments, {
      props: { comments: mockComments },
    })
    expect(wrapper.text()).toContain('匿名用戶A：很棒的課程')
  })

  it('renders comment content', () => {
    const wrapper = mount(CourseComments, {
      props: { comments: mockComments },
    })
    expect(wrapper.text()).toContain('老師教得很好')
  })

  it('renders comment date', () => {
    const wrapper = mount(CourseComments, {
      props: { comments: mockComments },
    })
    expect(wrapper.text()).toContain('2024-01-15')
  })

  it('renders like and dislike buttons', () => {
    const wrapper = mount(CourseComments, {
      props: { comments: mockComments },
    })
    const voteButtons = wrapper.findAll('.comments__vote-btn')
    expect(voteButtons.length).toBeGreaterThan(0)
  })

  it('sorts by date by default', () => {
    const wrapper = mount(CourseComments, {
      props: { comments: mockComments },
    })
    const items = wrapper.findAll('.comments__item')
    // Most recent first (2024-01-20 before 2024-01-15)
    expect(items[0]?.text()).toContain('2024-01-20')
    expect(items[1]?.text()).toContain('2024-01-15')
  })

  it('switches to popular sort when clicked', async () => {
    const wrapper = mount(CourseComments, {
      props: { comments: mockComments },
    })
    const sortButtons = wrapper.findAll('.comments__sort-btn')
    expect(sortButtons.length).toBeGreaterThan(1)
    await sortButtons[1]?.trigger('click')
    expect(sortButtons[1]?.classes()).toContain('comments__sort-btn--active')
  })

  it('shows empty message when no comments', () => {
    const wrapper = mount(CourseComments, {
      props: { comments: [] },
    })
    expect(wrapper.text()).toContain('目前尚無留言')
  })

  it('renders input field for new comment', () => {
    const wrapper = mount(CourseComments, {
      props: { comments: mockComments },
    })
    expect(wrapper.find('.comments__input').exists()).toBe(true)
  })

  it('renders submit button', () => {
    const wrapper = mount(CourseComments, {
      props: { comments: mockComments },
    })
    expect(wrapper.find('.comments__submit-btn').exists()).toBe(true)
  })

  it('disables submit button when input is empty', () => {
    const wrapper = mount(CourseComments, {
      props: { comments: mockComments },
    })
    const submitBtn = wrapper.find('.comments__submit-btn')
    expect(submitBtn.attributes('disabled')).toBeDefined()
  })

  it('enables submit button when input has value', async () => {
    const wrapper = mount(CourseComments, {
      props: { comments: mockComments },
    })
    const input = wrapper.find('.comments__input')
    await input.setValue('新留言')
    const submitBtn = wrapper.find('.comments__submit-btn')
    expect(submitBtn.attributes('disabled')).toBeUndefined()
  })

  it('clears input after submit', async () => {
    const wrapper = mount(CourseComments, {
      props: { comments: mockComments },
    })
    const input = wrapper.find('.comments__input')
    await input.setValue('新留言')
    await wrapper.find('.comments__submit-btn').trigger('click')
    expect((input.element as HTMLInputElement).value).toBe('')
  })

  it('submits comment on Enter key', async () => {
    const wrapper = mount(CourseComments, {
      props: { comments: mockComments },
    })
    const input = wrapper.find('.comments__input')
    await input.setValue('新留言')
    await input.trigger('keydown', { key: 'Enter' })
    expect((input.element as HTMLInputElement).value).toBe('')
  })

  it('does not submit when input is whitespace only', async () => {
    const wrapper = mount(CourseComments, {
      props: { comments: mockComments },
    })
    const input = wrapper.find('.comments__input')
    await input.setValue('   ')
    await wrapper.find('.comments__submit-btn').trigger('click')
    // Input should not be cleared if submission didn't happen
    expect((input.element as HTMLInputElement).value).toBe('   ')
  })
})
