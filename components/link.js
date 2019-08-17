// Inspired by https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/Link.js

import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import {withRouter} from "next/router"
import NextLink from "next/link"
import MuiLink from "@material-ui/core/Link"

// eslint-disable-next-line react/display-name
const NextComposed = React.forwardRef(function NextComposed(props, ref) {
    const {as, href, prefetch, ...other} = props

    return (
        <NextLink href={href} prefetch={prefetch} as={as}>
            <a ref={ref} {...other} />
        </NextLink>
    )
})

NextComposed.propTypes = {
    as: PropTypes.string,
    href: PropTypes.string,
    prefetch: PropTypes.bool,
}

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props) {
    const {
        activeClassName = "active",
        router,
        className: classNameProps,
        innerRef,
        naked,
        nav,
        ...other
    } = props

    const isActive = router.pathname === props.href
    const className = clsx(classNameProps, {
        [activeClassName]: isActive && activeClassName,
    })

    let linkColor = other.color
    if (nav) {
        if (isActive) {
            linkColor = "primary"
        } else {
            linkColor = "inherit"
        }
    }

    if (naked) {
        return <NextComposed className={className} ref={innerRef} {...other} />
    }

    return (
        <MuiLink
            component={NextComposed}
            className={className}
            color={linkColor}
            ref={innerRef}
            {...other}
        />
    )
}

Link.propTypes = {
    activeClassName: PropTypes.string,
    as: PropTypes.string,
    className: PropTypes.string,
    href: PropTypes.string,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    naked: PropTypes.bool,
    nav: PropTypes.bool,
    onClick: PropTypes.func,
    prefetch: PropTypes.bool,
    router: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
}

const RouterLink = withRouter(Link)

// eslint-disable-next-line react/display-name
export default React.forwardRef((props, ref) => (
    <RouterLink {...props} innerRef={ref} />
))
