/* eslint-disable max-len */
/**
 * Декоратор конструирования имени класса
 * @param blockName - базовое имя класса
 * @param separator - раазделитель класса
 */
export default function cn(blockName = 'block', separator = '__') {
    function getClassName(...arg) {
        let className = blockName;
        if (!arg.length) return className;

        arg.forEach((element) => {
            className = addPrefix2Class(className, element, separator);
        });

        return className;
    }
    getClassName.getClass = (element, separator = '') => addPrefix2Class('', element, separator);
    return function (target) {
        target.prototype.cn = getClassName;
    };
}

/**
 * hook для className
 * @param className Имя класса
 * @param separator разделитель
 *
 * const cn = useClassName('block');
 * cn() // 'block';
 */
export const useClassName = (className = 'block', separator = '__') => {
    function getClassName(...arg) {
        let beforeClassName = className.toString();
        if (!arg.length) return beforeClassName;

        arg.forEach((element) => {
            beforeClassName = addPrefix2Class(beforeClassName, element, separator);
        });

        return beforeClassName;
    }
    getClassName.getClass = (element, separator = '') => addPrefix2Class('', element, separator);
    return getClassName;
};

function getPrefix(base, separator, element) {
    switch (typeof element) {
        case 'undefined':
        case 'boolean': {
            if (element) { return base; } else { return ''; }
        }
        case 'string':
        default: {
            return base + separator + element;
        }
    }
}
function getClassNameArray4Object(object = {}, separator = '-') {
    return Object.keys(object)
        .map((key) => {
            const element = object[key];
            return getPrefix(key, separator, element);
        })
        .filter(element => element.length);
}
function addPrefix2Class(className, element, separator) {
    const array = className.split(' ');
    let classArray = [...array];
    switch (typeof element) {
        case 'object': {
            const elements = getClassNameArray4Object(element);
            array.forEach(cn => elements.forEach(element => classArray.push(getPrefix(cn, separator, element))));
            break;
        }
        case 'string':
        default: {
            classArray = array.map(cn => getPrefix(cn, separator, element));
            break;
        }
    }
    return classArray.join(' ');
}
