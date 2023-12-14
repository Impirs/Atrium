declare var dynevent: dynevent;

interface dynevent {
    show(option: Record<string, any>): boolean;
}

export const showBigday = (dynevent as any).show;
