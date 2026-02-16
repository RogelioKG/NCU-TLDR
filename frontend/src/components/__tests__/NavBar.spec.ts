import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import NavBar from '../NavBar.vue'

describe('navBar', () => {
  it('renders brand title', () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    expect(wrapper.text()).toContain('NCU TLDR')
  })

  it('renders navigation links', () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })
    expect(wrapper.text()).toContain('首頁')
    expect(wrapper.text()).toContain('我的評價')
    expect(wrapper.text()).toContain('我的等級')
    expect(wrapper.text()).toContain('關於我們')
  })

  it('renders login and register buttons', () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    })
    expect(wrapper.text()).toContain('登入')
    expect(wrapper.text()).toContain('註冊')
  })

  it('applies scrolled class when scrolled', async () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    })

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 50, writable: true })
    window.dispatchEvent(new Event('scroll'))

    await new Promise(resolve => setTimeout(resolve, 100))
    expect(wrapper.find('.navbar').classes()).toContain('navbar--scrolled')
  })

  it('does not apply scrolled class when not scrolled', () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    })
    expect(wrapper.find('.navbar').classes()).not.toContain('navbar--scrolled')
  })

  it('renders RouterLink to home', () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
    const brandLink = wrapper.find('.navbar__brand')
    expect(brandLink.exists()).toBe(true)
  })
})
