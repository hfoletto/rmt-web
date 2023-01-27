import { useSlots } from 'vue'
import { VNode } from '@vue/runtime-core'

export default function useHasSlot() {
    const slots = useSlots();
    return function hasSlot(name: string) {
        // @ts-ignore
        return slots[name] && !isEmptySlot(slots[name]());
    };
}

function isEmptySlot(items: VNode[]) {
    if (!items.length) return true;
    return !items.some(hasSlotContent);
}

function hasSlotContent(item: VNode) {
    const type = item.type.toString();
    if (type === 'Symbol(Comment)') return false;
    // @ts-ignore
    if (type === 'Symbol(Text)' && !item.children.trim()) return false;
    return true;
}
