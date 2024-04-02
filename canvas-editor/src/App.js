import React, { useRef, useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';

const TemplateEditor = () => {
  const canvasRef = useRef(null);
  const [backgroundColor, setBackgroundColor] = useState("#0369A1");
  const [textColor, setTextColor] = useState("#000000");

  useEffect(() => {
    drawCanvas();
  }, [backgroundColor, textColor]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Insert image
    const image = new Image();
    image.src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA4gMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQIDAAEGBwj/xABAEAABAwIDBgMFBQYEBwAAAAABAAIDBBEFEiEGEzFBUWEicZEUMoGhsQcjQlJTFTNiktHhNEOCwVRjcpOy0vD/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAhEQEBAQEAAgMBAQADAAAAAAAAARECAxITIUExUQRCYf/aAAwDAQACEQMRAD8A4+mCa0thZKKZyZQO0C5q6Yd0zhomlM/gkVO/gmUElrarOtIeQyI2GRJYZe6Mjm04pVR1HL3RDJtOKTMm7q9k+nFIGm+7rW+7pfv+60Zu6cKmG/14qze3alkUmZysqJSyI2KtIkzNzC505rUlXndpoBySoz9Cp2lLcwa4t6hPAPNUAtNrLOuOiTyTkcTqoe0HqjCOpqvPoNG9FV7R3Soznqomo7ow9NHVN+JuqX1F+JS4z91W+o7owtGSTd0HLN3VEk/dCyTd08LVk0qAmkW5JL80HLJ3VSJtQmde6Xz21RE0ndAzPTwtCT6oCdGTO0QE7rq4gORqsWrrEJOadyYQv4JRA9HRSLKtpTiGS1tUdDKk0UiLilU2Lh3FN3Rcc/dJIpUUyZLFacsn7q5s/dJmTq1s6WHptv8AutGfulm/7rW/TxJ3TzjKdVOWUPgNzwSOOqyHjojopw5hsL9kBdE3fEBt3OJ0AKJtUROBuXMHHKeHmErpJ3RVjLHQkj1C6DD6smRkLQbjV3S3HVFuBztVUNdK5zSLElU7/unWIYOyoleaSppnG+gDspXNVsVRQzmGridE/iAeY6gq+bKiijP3Ud93S/fd1OVsjIY57XikuGPHAkcR5hPC0WZu6rdN3QJnUDMng0W+buqJJe6GdMqXy6J4nV0ktkLJKoSSoaSRPC1uSRCyvW5HoaR6qRNqqZ6Clcr5XISQp4nVeZYoXWJkYQvRkUiWRvRUb1lW0NY5EVFKlUciIjk7qbFym0cyvbMlDZSOaubN3Sw9N2zd1YJkqbN3UxP3SwaZ75Zvu6Xb89Vm+7p4WmJmupxVjozole+7rW+7p4WnvtzDZ+ocu1wuaCnwOOqdG18tRdwzC4tcgfT5rz/B8OnxTevZJHBTwj7yeU2a3tpqT2C6GKU0mGR0MtXDLA8udR1cbvATfxMdf3Tfr1Wff+RXN/0xxaSKqgjqKdjd7mAcWMy6nkfiiaqrpaMvoMSgZPG2L7t0jM5e/QHLz69OASOHFmUkL6TEqUOBOYFwI8uH+yIgx7CpHQvrYYZX3JlkDXF976WcdRbzUSWLuOdx2KKCeN9O1zYp25hETcxnmPLojZaR0WBOpzN981hqnsadBpw8w0X87hFbUYDNOxuL4bPLW0zmh+V2rmt526oWF/t0k+G08HssJiyuqXgvfJmHfRoOt7a258VV62RE/XNmZRMyBdNrxv5KBm7roxjo10yqdKhDMoGVVhaIdIqHyqp0iqdInhanI9Dvfdae+6pc9PCakch5HKT3XVDygkVijdYmFsTkUx6XxuRDH6LJtB7JO6IZKlzXq1smqWGYtl7q0S90tbKpiVGAyE3dTEyWCVSE3dLAZ77utb49UvbKXHTVYZlWAw33da3/AHS4zd1Hfd0YWu82SxjCjh9ThGNPfDFNM2aKdh91wFrHT66LoanDsIrqOClosTbuInPkO6kje973cSbGw4cAF5AZ/L4rcIkqnZaeB85B/wAqMvt6LHvxW3ZcVx3J/Y9ZZg8NON22vrXM/TlYwt9CFZDhOEF4dNM4fwtY0X+v0XB4OdpqQhtJSVZjv+6mbYehtZd7gOHV3tEdbVsggnI0a6TMGX43sOPSy5O/fj/s6+b4+p9TDhlHiDIY4qN8UcLRaON0ZbYeeY/Rchtq2pwzDJQ5hpzO9ocxvu875exHEL0COCaJsk9VWSCBouHP8AA6k8/ReS/aPtXHjldFSUX+Co7hr+G9dzPl/VX4OL11rLy+T6yOZMvdRMndCbwdVm8XouP7EmRRL0PnC2HBAxYXqDnLRso6J6WMc5VOKkSoORoxS8qlxV0nBDvRoxq6xQusQMY1yuY9DNKsaVC4Ka9WB6Fa5TDklCQ9TEiFzqbHXQBG8WbxUOdYKGdMzCGUgaE3uiCxtS45Ru5LDS2jik4mc3UFNcDM9VWQwBwfncRkDbucOYHeyMR1cDNLnSiL8ZfktfnwWV7HUkgaZGSXHvMvby1AXc4z9nOLSTtrcLiJjlsXxPIzRk8eC1VbHY9FUiWjpZp4tI5qec6PHP3j4hY9fQp2WJncrnMBjY/D31LIYZ6k1LYiJm5mwtI0dlOhJPM6LudnYH1sEbpKuWeWSV8QjzWiiDDb3BZvDXhzCDwfYbFcDx2Cqp2tlopfBMwzM8AOtjmIvlNiDx08022a2YxrB9oJSWwnDpXvflMzC5juo1vrp8lxf8jjrrcdvh745w7rKrBNn6YS4lUzBvBrQ8tzno1jLXSvGNvpMPZD+ysMgZvWB4lmkDi0cuH9TwUNptlcVq8WkqI2RTRkBkd5I/u2DiACeLjcnyCXYds5iOGT+0uwE1DS0gRRzRHK7rqSO3xKXi8HPPMvX9Z+TyXq/TmdoNpcWxoOFfUzuZ7wiZownyHH4rk5XPzneXa7kCu9n2WxwMlmbhEsZkkLmwwgENBPDQ8BwSipwHFWNL8Uw6paG6i8LuHpwXZzk/jC65Vz3MUd8e6nNkbPIGxublcbB19FBzHv1AB8lRJiUWuM1xx1U2yacUPF+P8A6Stgop6I3q1ve6ousuiGtMqgZVAlRJQGnyO5IaR7lc5UvQmo3PUrFixMm2lTBVTVMKVLApAqAK2CgJ5ldEUMroilVROR1gt0cHtc5aZmwxNGaSRwuGjy5nsqpXaLdMD7OGtv45TmPWwGnzPqU4no/paDDahhZRYXilblGs3tLWEeTQwj4ElN9lKmmwOSvqqStfDWbsRwNnjAlYcwLteHADouFdM8zCVj3scw3jc02LLcLdF6HVYc7aPCcOxWmqKd9W+mHtlnAOzs94lvG+l/7LSMetn9ak+0vaZrchqoJBzMkDST8VWftMx82DhREDrT/wB1ytXEYpCwm5HNCkd1Fn+tJn47IfaTjLQbwUBvyMB/9lIfaTixkEns+H5uohdf/wAlxDrAalVk8cqn1XuO5q/tFxOrBkmZSAnT90f6pcdr652u5pP+0f6rmGFwbrob3IGq2HFv73Q9Qj1g10T9sK9jiA2mae0IVjNtMci8VPV7ojnE0NK51kYkfmtfhqromeIgi4JKWYf9WYhiDqyvNTXPEksrQ6QvOru+nNCwlu6DXtNyeKrrHhlU5smuUAeQUadrZGGz7Ovcgmy0kZfqxzNyCW6tIsqxobFXvmjaCy+Y2sSOAVBNzdKqlTuo3WrrV0jbuokrLqJKA04qpym4qopky6xautIAptDU/p/NT/Z9V+n813seG/wIuLC7jVixvmbTxPOP2fVfprYw+s5Rj1XprcHv+BWjBf4Evmh/C8vGHVv6Q9VbHhlbyjHqvUosGb+RER4Qz9NHzHPE8ndhVcR+7HqrqPDqttPPFLF0kjcOThxHxH0XqVRQQQtzOZYWVUNPRucBpc8AnPKXXi15SMMqqi8tMwOjcdBfUdk52Owysptp6OSSOzXiSIkH80bmj5kLo6qiGzeMtnyl+GVejhxyO7eX0XUxUULJIKiDKQ0tkY4HQ8wQtPfLL+MfXd5/XmmMwFlS8OHBxSWZoPhdex5hehbc4SKbEpXRg7t/jZpyK4WtDonhrY3OLug0C26n6w46/C2R1iGt1I0J5KbLEOA9481DKQ5wcxrm/ivyW4Gue7wOtlPiaeQUNYweDxBxNja3BWeA5nAknuFsxwA3HHpxUxCJGlrSA21yOalSdI0udZrg0k+6f7prTUsjXNDmZXXOUdSqcMpmlkcsoDdA45/wnr2Xb7N4WyWuke7PIAACM3haba6eiV+pp837x57VYJXPqXvDBa/NVfsDEObWWXs7sHh101VT8JY6wAOnQLOedfwvIm4DXZQ0AaKYwCu6N+K9aGDD8h+IVU2EOBblZpz04pXzK+F5S/Aq9utmqo4RW9B6L1xmDyStu6HL00VUmBbrVzNUvmHxPJzhNZzA9FB2FVY6ei9Pmwq34EFLhpB9xVPKPiecuwyqGpAKqdQVHQL0KXDtPcQU2H/wJzyJvjcP7DP2WLrDRa8PksVfIXo7hlPz0RtPAdLC6rgZG/gz6JnThjQPD9Fw46p0nBTPePC26LZRO/GLfBRpg9008dQCYXAZPCAACLEXzan4BFUWHQU1PE2kFRFHCLtgbLoex11RhXpZFhzdPCtYhhkzqKVlE5jKhzCGPcLhpTKlicwvJa05iLDQEDvxuj2N8JLnHnqRwVzlF7cLQ4biUMcr9pHwzU1rAU8RBHUlN8M2UwquYyqopM8QJGa507Lp6ajjMPvmVjznBOmhSPaCm2gwub9obMvhmaR9/QT6B9ubDyPVbccbftl35bn0BxbDsJlpJaI0s1SHaXByhp6gnW/wSLB2T7MA09dAavDCbxSEeKE/D6eiIP2o0NPUCn2m2eraGfm5gDm3+Nj6XTuj232KroyG4nFGHCxZUsdH8PEF1888yZjh797d0j2olwzFqGF1NPC+VrMrmx3sBy46ryzF8Nc2qa8OdkGhC9Ox+n2VqpHS4Vikcb3fpuDm/Veb7S1M1DVupnuZOALtlgOYOH+3kuuel4cMvlnluEz6ZrJHOA48e6qjgbEXHiSb3VT6wOeH7t4cOBsVW6u7O9Fz3HdPZjmtZUHMLvcLs6BWwlwkBFgAQLc9UA6aY6We830cWm6ugmku0OikNv4Tqoxrtx2uzNBJiVe6KdjTBG0SF7B7p/D8ey9Kp4HYVvXwUUEklQ8vmDwRoAAALHTgfVcZ9mmMsp6x7q9rIaeNuYhxs6Q8LAfH5L1ifHdmHQtmqcTo4MwuQ+Zt1peeY5Z133blzCCmxakb4KrCZoR+aGXMD8HD/dNsGOF4hK9tM+QSc2Sx5beR4FKq/bXYajP+PM5H4YInPv8AEC3zQNH9pTcQldTbG7K1dVKTl3suVrR5lpP1Cx78fjv46PH5PPL99O4OFRMOrDfzVL8MMkrhlYISNC33rqrBMPxiRgrNoq0GsebmnpjaKNvJo69yj63DKWrgME7ZHxE3Ld64X9Cubrib9Ovnu0DUUogdCz2hjQTlDHN1ef8A4IWpggzWe+Np00cbceCOhwxtJ7PHSHcUkDXNFMy2V17WvcXFtbWPMqqqpmSTwTPb4og6xDxYE9uayvLSdFtRhzcvujrwS6bDLH3ePZNJqYxuleHuc6QguOY8R06ICKlipqupq2g72oIMhfIXA28+CnF6UVOHi2lrJXU0bWEB5a0uvYEi5XS1MsIbYZLdLBKa2SNzba+Y0+aJoJTRRXPiCxEOhgLib8T+YrFaVVPVyXsGSW8k2gqng2yn4lAQSwjg1qPiqYi3VxCMTpnTzEm5adUfTTEngB1FuKUR1sPDO74FG001PmuXvKfqXs6CmfI43LXdkygz/lPoklPXQC1nEeYTBlbGR4Xu9FciLThr8rfdOiQY5tPS4a0mZwvroQrZq6HduD3vHkvOdrKCGve7JLKDfRayz9Z2X8XY19o+FVcL6aopoqmNwsWyxB7T8CvN8brsBqXl1FSGlceUBcG/ynQfCyjX7OVMbiYpHO10uElqMKrovejv5LSdcIvHd/qqaZub7mQu7OGqqFU9unDyUH0s7T4onKotcOLHDzCrdHrgr21/NxW/bXfmKD15iyxAGe2u/MVr22TkShFiAM9olfw4dyr6WSnMmWpneB/yh8rlLgHHQAn4KyKmqHHwROuj2wvXXbYLiOytG8PqMMbWOBuPaXOeP5fd9QvUsA+0bB5YWwQQspwBYMijytHovBabCMRm9yMi66PBtk8TfK1zpHNHYKOuub/TnPX4+hqHGKera3dyAg68UW6UuHZcJsthQpAwTSPJHG67SN8bIwADZZX/AMazf1qYkG7QB8LJbU1UreB5flTCaSO3ApdU5H8QR2Wdi5S+oknI8GpP8IS2odUkWe7L/pui614a02LgB3SGorPGQ4O80vRXssfvubgf9CBqM+viH8qhLO2/7xwCofPGBrM4+ZR6D3Z95+q3+X+yxDe0x/mWKvUezgWYxWjhKrmY5XtGkqxYtmGrW7QYiP8AO+StG0uJg6TfVYsRINFR7S4oALVBV7Nq8XHCo+S2sTwmztXi/OoB8wqZNpMSdxlHosWIwA59oMQJN5B6IGbGKx3vOb6LFiSgklfOeOX0Qr6qQ9PRYsTgqreuPGygXnssWK0Vq5Ww8jhZYsQS5lTI3hb0REOJVDD4S30WLFNXP4YwY5Xx2ySAfBModqMVY3wzj0WlikaJZtjjLOFQPRXHbbHLf4gen91pYnhWtHbTG/8AiB6H+qg7a/GDpvx6H+qxYjBKHftPijyQ6YeiDnx2vJuZR6LFiMAZ2NVp13g9FU/F6x3GRaWJ4Ef2nVfqLaxYjA//2Q=='; // Example online image URL
    image.onload = () => {
      const x = (canvas.width - image.width) / 2;
      const y = (canvas.height - image.height) / 2; // Adjust y-coordinate
      ctx.drawImage(image, x, y);

      // Draw text
      const text = "Coffee Cup";
      ctx.fillStyle = textColor;
      ctx.font = "30px Arial";
      const textWidth = ctx.measureText(text).width;
      const textX = (canvas.width - textWidth) / 2;
      const textY = 50; // Position text at the top
      ctx.fillText(text, textX, textY);
    };
  };

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color.hex);
  };

  const handleTextColorChange = (color) => {
    setTextColor(color.hex);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ marginRight: '20px' }}>
        <div>
          <label style={{ marginBottom: '10px' }}>Background Color:</label>
          <ChromePicker
            color={backgroundColor}
            onChange={handleBackgroundColorChange}
          />
        </div>
        <div>
          <label style={{ marginBottom: '10px' }}>Text Color:</label>
          <ChromePicker
            color={textColor}
            onChange={handleTextColorChange}
          />
        </div>
      </div>
      <canvas ref={canvasRef} width={400} height={400} style={{ border: '1px solid black' }} />
    </div>
  );
};

export default TemplateEditor;
