import type { Course } from '@/types'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import HomeView from '../HomeView.vue'

const mockCourses: Course[] = [
  {
    id: 1,
    name: '資料結構',
    teacher: '王小明',
    tags: ['必修'],
    ratings: { reward: 4.5, score: 4.0, easiness: 3.5, teacherStyle: 4.2 },
  },
]

describe('homeView', () => {
  const createRouterMock = () => {
    return createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', name: 'home', component: HomeView },
        { path: '/course/:id', name: 'course-detail', component: { template: '<div>Detail</div>' } },
      ],
    })
  }

  it('renders wishing well component', () => {
    const router = createRouterMock()
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.findComponent({ name: 'WishingWell' }).exists()).toBe(true)
  })

  it('renders search bar', () => {
    const router = createRouterMock()
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.findComponent({ name: 'SearchBar' }).exists()).toBe(true)
  })

  it('renders course grid', () => {
    const router = createRouterMock()
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.findComponent({ name: 'CourseGrid' }).exists()).toBe(true)
  })

  it('navigates to course detail when course is selected', async () => {
    const router = createRouterMock()
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    })

    const pushSpy = vi.spyOn(router, 'push')
    const courseGrid = wrapper.findComponent({ name: 'CourseGrid' })
    await courseGrid.vm.$emit('select-course', mockCourses[0])

    expect(pushSpy).toHaveBeenCalledWith({
      name: 'course-detail',
      params: { id: 1 },
    })
  })

  it('handles search event', async () => {
    const router = createRouterMock()
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    })

    const searchBar = wrapper.findComponent({ name: 'SearchBar' })
    await searchBar.vm.$emit('search', '資料結構')
    // Search functionality is TODO, just verify no errors
    expect(wrapper.exists()).toBe(true)
  })

  it('handles wish course selection', async () => {
    const router = createRouterMock()
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    })

    const pushSpy = vi.spyOn(router, 'push')
    const wishingWell = wrapper.findComponent({ name: 'WishingWell' })

    // Emit a wish course that matches a course in the list (id: 1 is 演算法)
    await wishingWell.vm.$emit('select-course', {
      id: 1,
      name: '演算法',
      teacher: '王大明',
    })

    expect(pushSpy).toHaveBeenCalledWith({
      name: 'course-detail',
      params: { id: 1 },
    })
  })
})
