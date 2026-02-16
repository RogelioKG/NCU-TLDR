import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import router from '../index'

describe('router', () => {
  it('has home route', () => {
    const homeRoute = router.getRoutes().find(r => r.name === 'home')
    expect(homeRoute).toBeDefined()
    expect(homeRoute?.path).toBe('/')
  })

  it('has course detail route', () => {
    const detailRoute = router.getRoutes().find(r => r.name === 'course-detail')
    expect(detailRoute).toBeDefined()
    expect(detailRoute?.path).toBe('/course/:id')
  })

  it('course detail route accepts id param', () => {
    const detailRoute = router.getRoutes().find(r => r.name === 'course-detail')
    expect(detailRoute?.path).toContain(':id')
  })

  it('course detail route has props enabled', () => {
    const detailRoute = router.getRoutes().find(r => r.name === 'course-detail')
    expect(detailRoute?.props).toBeTruthy()
  })

  it('navigates to home route', async () => {
    await router.push('/')
    expect(router.currentRoute.value.name).toBe('home')
  })

  it('navigates to course detail route', async () => {
    await router.push('/course/1')
    expect(router.currentRoute.value.name).toBe('course-detail')
    expect(router.currentRoute.value.params.id).toBe('1')
  })

  it('scrolls to top on navigation', async () => {
    const testRouter = createRouter({
      history: createMemoryHistory(),
      routes: router.getRoutes(),
      scrollBehavior: router.options.scrollBehavior,
    })

    const scrollBehavior = testRouter.options.scrollBehavior
    if (scrollBehavior) {
      const result = scrollBehavior(
        { path: '/course/1' } as any,
        { path: '/' } as any,
        null,
      )
      expect(result).toEqual({ top: 0 })
    }
  })

  it('restores saved position when available', async () => {
    const testRouter = createRouter({
      history: createMemoryHistory(),
      routes: router.getRoutes(),
      scrollBehavior: router.options.scrollBehavior,
    })

    const scrollBehavior = testRouter.options.scrollBehavior
    if (scrollBehavior) {
      const savedPosition = { top: 100, left: 0 }
      const result = scrollBehavior(
        { path: '/course/1' } as any,
        { path: '/' } as any,
        savedPosition,
      )
      expect(result).toEqual(savedPosition)
    }
  })
})
