import { shallowMount } from '@vue/test-utils'
import TransactionList from '@/components/TransactionList.vue'
import transactions from './transactions.mock.js'

describe('TransactionList.vue', () => {
  it('renders transactions when have them', () => {
    const wrapper = shallowMount(TransactionList, {
      propsData: { transactions }
    })
    expect(wrapper.findAll('.tx').length).toEqual(transactions.length)
  })
})
