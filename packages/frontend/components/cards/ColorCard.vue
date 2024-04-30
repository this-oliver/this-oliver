<script setup lang="ts">
const props = defineProps({
	color: {
		type: String,
		default: undefined
	},
	colorSource: {
		type: String,
		default: undefined
	},
	height: {
		type: String,
		default: '100px'
	},
	width: {
		type: String,
		default: '100%'
	},
	padding: {
		type: String,
		default: '0.5rem'
	},
	borderRadius: {
		type: String,
		default: '5px 5px 0px 0px'
	}
});

const { getMaterialColor, getRandomHexColor, convertStringToColor, isHexColor } = useColor();

const color = computed<string>(() => {
	if (props.colorSource) {
		return convertStringToColor(props.colorSource);
	}

	if (props.color && isHexColor(props.color)) {
		return props.color;
	}

	if (props.color) {
		return getMaterialColor(props.color);
	}

	return getRandomHexColor();
});

</script>

<template>
  <div
    :style="{
      backgroundColor: color,
      height: height,
      width: width,
      padding: padding,
      borderRadius: borderRadius
    }">
    <slot />
  </div>
</template>
