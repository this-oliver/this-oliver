<template>
  <div>
    <b-row
      class="my-2"
      align-h="center">
      <b-col
        class="mt-5"
        cols="auto">
        <b-button-group>
          <b-button
            class="mx-1"
            v-for="description in descriptions"
            :key="description.enum"
            :variant="
              isDarkTheme
                ? getDarkVariant(description.variant)
                : description.variant
            "
            @click="currentDescription = description">
            {{ description.button }}
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <b-row
      class="mx-3 my-3"
      align-h="center">
      <b-col cols="auto">
        <span v-html="getSanitizedHtml(currentDescription.text)" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import { mapGetters } from "vuex";
	import { ROUTES } from "../helpers/router-helper";
	import { sanitizeHtml } from "../helpers/security-helper";

	const SHORT = {
		enum: "SHORT",
		text:
			"Hi, my name is Oliver and I'm building this resume so that job recruiters can see how competenet and ambitous I am. I like solving problems and learning from my mistakes. <hr/> I read somewhere that job recruiters love people with core beliefs so here goes: I think sustainability should be at the forefront of everything we should be doing.",
		button: "short",
		variant: "outline-primary"
	};
	const LONG = {
		enum: "LONG",
		text:
			"I studied Software Engineering at the University of Gothenburg (2017-2020) where I learnt how to build object oriented sofware like a Java library system (in the terminal), taught a car to parallel park in arduino & c++ , taught another car how to manuver through an intersection filled with other cars and road signs (using object-detection, docker and c++) all while coding with people that would become good friends and collegues. <hr/> Shortly afterwards, the *scary music* Covid-19 pandemic hit the world stage and I decided it was just the right time to feed my curioisty, so I began studying a one-year masters program on Entreprenurship and Innovation Management at the Royal Institue of Technology (or KTH) for short. So far, I'm learning how to coordinate resources to exploit opportunities that bring real value to as many stakeholders as possible... but on a much smaller scale since I can't really meet with all my classmates because of online-learning.",
		button: "long",
		variant: "outline-danger"
	};

	export default {
		name: "Landing",
		data: function() {
			return {
				descriptions: [SHORT, LONG],
				currentDescription: SHORT
			};
		},
		computed: {
			...mapGetters({
				isDarkTheme: "theme/isDarkTheme"
			})
		},
		methods: {
			goToResume: function() {
				this.goTo(ROUTES.resume);
			},
			getDarkVariant: function(variant) {
				switch (variant) {
				case "outline-dark":
					return "outline-light";
				default:
					return variant;
				}
			},
			getSanitizedHtml: function(html) {
				return sanitizeHtml(html);
			}
		}
	};
</script>
