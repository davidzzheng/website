import plugin from 'tailwindcss/plugin'

export const underlined = plugin(({ addUtilities, theme, e }) => {
  const colors = theme('colors') as Record<string, string | Record<string, string>>

  const baseStyle = {
    display: 'inline-block',
    textDecoration: 'none',
    position: 'relative',
    '--underlined-color': colors.foreground,
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      transform: 'scaleX(0)',
      height: '2px',
      bottom: '0',
      left: '0',
      transformOrigin: 'bottom right',
      transition: 'transform 0.25s ease-out',
    },
    '&:hover, &.underlined-active': {
      '&::after': {
        transform: 'scaleX(1)',
        transformOrigin: 'bottom left',
        backgroundColor: 'var(--underlined-color)',
      },
    },
  }

  const styles = {
    '.underlined': baseStyle,
    ...Object.keys(colors).reduce((acc, key) => {
      const color = colors[key]
      if (typeof color === 'object') {
        return Object.keys(color).reduce(
          (acc, shade) => ({
            ...acc,
            [`.${e(`underlined-${key}-${shade}`)}`]: {
              '--underlined-color': color[shade],
            },
          }),
          acc,
        )
      }
      return acc
    }, {}),
  }

  addUtilities(styles)
})
