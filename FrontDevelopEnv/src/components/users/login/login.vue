<template>
    <div>
        <vk-button
                :type="props.type.demo.value"
                :aria-type="props.ariaType.demo.value"
                :value="props.value.demo.value"
                :disabled="props.disabled.demo.value"
                :active="props.active.demo.value"
                :color="props.color.demo.value"
                :size="props.size.demo.value"
                :width="props.width.demo.value"
                @click.native="props.active.demo.value = !props.active.demo.value">
            Button
        </vk-button>
    </div>
</template>

<script>
    export default {
        data: () => {
        	return {
              props: {
				        value: {
					        description: 'The value of the button usually used in combination with others components.',
					        demo: {
						        type: 'Overview'
					        }
				        },
				        type: {
					        description: 'The HTML button type.',
					        demo: {
						        type: 'Select',
						        options: [
							        { text: 'button', value: 'button' },
							        { text: 'submit', value: 'submit' },
							        { text: 'reset', value: 'reset' }
						        ],
						        value: 'button'
					        }
				        },
				        ariaType: {
					        description: 'The HTML ARIA type.',
					        demo: {
						        type: 'Select',
						        options: [
							        { text: 'pressed', value: 'pressed' },
							        { text: 'checked', value: 'checked' }
						        ],
						        value: 'pressed'
					        }
				        },
				        active: {
					        description: 'The initial state of the <code>active</code> local state.',
					        demo: {
						        type: 'Boolean',
						        value: false
					        }
				        },
				        disabled: {
					        description: 'Whether to present the button as disabled.',
					        demo: {
						        type: 'Boolean',
						        value: false
					        }
				        },
				        color: {
					        demo: {
						        type: 'Select',
						        options: [
							        { text: 'default', value: '' },
							        { text: 'primary', value: 'primary' },
							        { text: 'success', value: 'success' },
							        { text: 'danger', value: 'danger' },
							        { text: 'link', value: 'link' }
						        ],
						        value: 'success'
					        }
				        },
				        size: {
					        demo: {
						        type: 'Select',
						        options: [
							        { text: 'default', value: '' },
							        { text: 'mini', value: 'mini' },
							        { text: 'small', value: 'small' },
							        { text: 'large', value: 'large' }
						        ],
						        value: 'large'
					        }
				        },
				        width: {
					        demo: {
						        type: 'Select',
						        options: [
							        { text: 'default', value: '' },
							        { text: '1-1', value: '1-1' },
							        { text: '1-2', value: '1-2' },
							        { text: '1-3', value: '1-3' },
							        { text: '1-4', value: '1-4' },
							        { text: '1-5', value: '1-5' },
							        { text: '1-6', value: '1-6' },
							        { text: '1-10', value: '1-10' }
						        ],
						        value: ''
					        }
				        }
			        }
            }
        }
    }

</script>