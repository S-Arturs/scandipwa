/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { Constructable } from 'Type/Constructable';
import { SimpleComponent } from 'Util/SimpleComponent';

/** @namespace Util/RenderHOC/renderHOC */
export const renderHOC = <
    P extends Record<string, any> & { children?: React.ReactNode },
    T,
    N extends string
    >(
        Component: Constructable<SimpleComponent<T>>,
        logicHook: (props: P) => T,
        displayName?: N
    ): React.FC<P> => {
    const FunctionalComponent = (props: P): JSX.Element | null => {
        const componentProps = logicHook(props);
        if (!(componentProps as { children?: React.ReactNode }).children) {
            (componentProps as { children?: React.ReactNode }).children = props.children;
        }
        const renderComponent = new Component(componentProps);

        return renderComponent.render();
    };

    if (displayName) {
        FunctionalComponent.displayName = displayName;
    }

    /**
     * For react to understand that this should be treated like any other component component
     * we need to execute it like this.
     * */
    return (props: P) => <FunctionalComponent { ...props } />;
};