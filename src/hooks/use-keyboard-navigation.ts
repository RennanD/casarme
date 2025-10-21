import { useEffect, useCallback } from 'react';

// Hook para navegação por teclado
export function useKeyboardNavigation() {
  // Navegação por teclado para seções
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Escape para fechar modais/menus
    if (event.key === 'Escape') {
      const openMenus = document.querySelectorAll('[aria-expanded="true"]');
      openMenus.forEach(menu => {
        const button = menu as HTMLElement;
        button.click();
      });
    }

    // Enter ou Space para ativar botões
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') {
        event.preventDefault();
        target.click();
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Função para navegar entre seções
  const navigateToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.focus();
    }
  }, []);

  // Função para navegar entre elementos focáveis
  const navigateToNextElement = useCallback(() => {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as Element);
    const nextIndex = (currentIndex + 1) % focusableElements.length;
    (focusableElements[nextIndex] as HTMLElement)?.focus();
  }, []);

  const navigateToPreviousElement = useCallback(() => {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as Element);
    const previousIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
    (focusableElements[previousIndex] as HTMLElement)?.focus();
  }, []);

  return {
    navigateToSection,
    navigateToNextElement,
    navigateToPreviousElement,
  };
}

// Hook para gerenciar foco em modais
export function useModalFocus(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [isOpen]);
}

// Hook para navegação por setas
export function useArrowNavigation() {
  const handleArrowKeys = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    const target = event.target as HTMLElement;

    if (key === 'ArrowDown' || key === 'ArrowUp') {
      const listItems = target.closest('[role="list"]')?.querySelectorAll('[role="listitem"]');
      if (listItems && listItems.length > 0) {
        event.preventDefault();
        const currentIndex = Array.from(listItems).indexOf(target.closest('[role="listitem"]') as Element);
        const nextIndex = key === 'ArrowDown'
          ? Math.min(currentIndex + 1, listItems.length - 1)
          : Math.max(currentIndex - 1, 0);
        (listItems[nextIndex] as HTMLElement)?.focus();
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleArrowKeys);
    return () => document.removeEventListener('keydown', handleArrowKeys);
  }, [handleArrowKeys]);
}
