# Simulación Interactiva de Circuito Eléctrico

Esta es una aplicación web educativa que proporciona una simulación interactiva de un circuito eléctrico simple. Los usuarios pueden encender y apagar un interruptor para visualizar el flujo de electrones y ver cómo se enciende una bombilla.

## Cómo Desplegar en GitHub Pages

Puedes alojar tu propia versión de esta simulación de forma gratuita utilizando GitHub Pages. Sigue estos pasos:

1.  **Crea un Repositorio en GitHub:**
    *   Ve a [GitHub](https://github.com) y crea un nuevo repositorio. Dale el nombre que prefieras (p. ej., `simulador-circuito`).

2.  **Sube los Archivos del Proyecto:**
    *   En la página de tu nuevo repositorio, haz clic en `Add file` > `Upload files`.
    *   Arrastra y suelta todos los archivos de este proyecto (`index.html`, `index.tsx`, `App.tsx`, etc.) en el área de carga.
    *   Confirma los cambios (`Commit changes`).

3.  **Configura GitHub Pages:**
    *   En tu repositorio de GitHub, ve a la pestaña **Settings**.
    *   En el menú de la izquierda, selecciona **Pages**.
    *   En la sección "Build and deployment", bajo "Source", selecciona **Deploy from a branch**.
    *   En "Branch", asegúrate de que esté seleccionada la rama `main` (o la rama principal que uses) y la carpeta `/ (root)`.
    *   Haz clic en **Save**.

4.  **¡Listo!**
    *   GitHub tardará unos minutos en construir y desplegar tu sitio.
    *   Una vez que esté listo, la URL de tu página aparecerá en la parte superior de la configuración de GitHub Pages (tendrá un formato como `https://<TU-USUARIO>.github.io/<TU-REPOSITORIO>/`).
    *   ¡Visita el enlace para ver tu simulación en vivo!

---

Este proyecto está configurado para ejecutarse directamente en el navegador sin necesidad de un paso de compilación (`build`), gracias al uso de `importmap` para gestionar las dependencias de React.
Actualización para forzar el despliegue.