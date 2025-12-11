module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      typography: (theme) => ({
        medium: {
          css: {
            '--tw-prose-body': theme('colors.slate.800'),
            '--tw-prose-headings': theme('colors.slate.900'),
            '--tw-prose-links': theme('colors.slate.900'),
            '--tw-prose-links-hover': theme('colors.slate.600'),
            '--tw-prose-bold': theme('colors.slate.900'),
            '--tw-prose-counters': theme('colors.slate.600'),
            '--tw-prose-bullets': theme('colors.slate.400'),
            '--tw-prose-hr': theme('colors.slate.300'),
            '--tw-prose-quotes': theme('colors.slate.900'),
            '--tw-prose-quote-borders': theme('colors.slate.300'),
            '--tw-prose-code': theme('colors.slate.900'),
            '--tw-prose-pre-bg': theme('colors.slate.900'),
            '--tw-prose-pre-code': theme('colors.white'),
            '--tw-prose-pre-border': theme('colors.slate.700'),
            '--tw-prose-th-borders': theme('colors.slate.300'),
            '--tw-prose-td-borders': theme('colors.slate.200'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
