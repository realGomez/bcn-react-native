export default function configuredVariant(configured_options, product) {
    if (!configured_options || !product.variants) return;
    const matchVariant = product.variants.find(variant => {
        const attributes = variant.attributes;
        const matchAttributes = attributes.filter(attribute => {
            return configured_options[attribute.code] && configured_options[attribute.code]['valueIndex'] == attribute.value_index
        })

        return matchAttributes.length == configured_options.length
    })

    return matchVariant
}
