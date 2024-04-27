/**
 * Removes the specified attribute from the HTML element with the given ID.
 * If the element with the provided ID does not exist, returns true if the attribute is successfully removed, false otherwise.
 * 
 * @param {string} elementId - The ID of the HTML element from which to remove the attribute.
 * @param {string} attributeName - The name of the attribute to be removed.
 * @returns {boolean} - Returns true if the attribute is successfully removed, false otherwise.
 */
export function removeAttributeFromElementById(elementId, attributeName) {
    /**
     * @type {HTMLElement|null} element
     */
    const element = document.getElementById(elementId);

    if (element) {
        element.removeAttribute(attributeName);
        console.log(`Attribute "${attributeName}" removed from element with ID "${elementId}".`);
        return true;
    } else {
       return false;
    }
}
