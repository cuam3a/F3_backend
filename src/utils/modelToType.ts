import { Types } from "mongoose";
import {
  ConstantValue,
  User,
  Payment,
  Document,
  Competition,
  CompetitionUser,
  CompetitionSteps,
  CompetenceUser,
  Competence,
  Region,
  CompetitionUserTest,
  Test,
  QuestionTest,
  TestUser,
  CoachUser,
  Status,
} from "../interfaces/types";
import { getBonus } from "./competition";
const fs = require("fs");
const sharp = require("sharp");

const imgPhotoDefault =
  "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAcHBwcIBwgJCQgMDAsMDBEQDg4QERoSFBIUEhonGB0YGB0YJyMqIiAiKiM+MSsrMT5IPDk8SFdOTldtaG2Pj8D/wgALCAFoAWgBAREA/8QAHAABAAMBAQEBAQAAAAAAAAAAAAYHCAUEAwIB/9oACAEBAAAAANIgAAAAAAAAAAAAAAAAAc3g8z5/Tpd/pAAAAADwVnXkH5H9D+decWJZfvAAAAEZpKrfh9plLpF1Pt8uXHYhDPl97Tu6SAAAA51BVH+bCtuxfUAeWu6krz9W9ffRAAAIDmfk2NfkqAAIvQVcdbTM9AAApXP/AEdG2YAABWucOdoK6AAAoWjZfqPtAAAHHy3D71vcAApbPk81J7AHxgEO53Rmk9+oDyZagehbnAAr/Kst1l6wFVUBxw7N/wBqAPJk6I6tnoAeDHH4192wGf6TALtv8ByMe/vY/vAGcah1BZgCos4ABpG2wFbZct/RoBGcd2JqYB48X88AOhtH1gMtV1saSAM2VNsOUgKozUABpe1QEXx3bWkgOfiqeapAM5VAABcGjADK0D2t7wVLm3TtngGXa1AAsvUIBWOYdJ2yDMVa7d9QBmupwALZ0mAebENladBimR6zAFN53AA0PcoAyZHNrBzsR3PoYAcnF3yAD67P7AAz1S+2+kIdkPRFygBQVIABdt/gBTed9eTAV7lXT1nAB8srwAAn2qPsAFZZg1VYQrbLmobLAB8aApr8h+rkv/7gArTL2o7JFfZU09ZwACPVTDOd0ZlasjAAVhmLVVhCHZD0TcgAAAAAU3nfXsvHPxFdGhQA/kZi3NA6Upk39ADPNMbb6QYpkeswDwUvUnFADtW7c/uAMmRzawMxVrt31AVtm/mAAHT0jZAHlxFZWnQVNmzT9mgpnPX8AAD+6IuMFYZi0lbQPBimeapCr8xgAAGnrODK0D2t7wM21LsaTHJxv4QAAD3bJ6pFseWxpQBHMcWLqUzxTQAAAXPoUyzXexJMAZyqDUdk+fE/jAAAD2bZ+9aZet7RwA52OvxsLrZqqkAAALU0tx8f/TY3QACB5Rl2sfvmyqgAAC09K/DJsS1VYAAFMZ6nmpfVR9DfkAAP3fF4eXLME0HdIABRFFTDUvXh+c4eAAS/Rcy4uXIheV9AABTGfOjo+yvzW9MQQAJ1ctl/qs85c7QF1AAAQLM3Jsa/5O41dwuOcj4ejrSSZ2H2kWoKuetpifAAAHPoOofzYduWH6gDy1zUte/q3L96IAAAI3SNWfD7TKXyHq/X5cqOxGG/H72ldsmAAAAHgrSu4PyP6H8684sOzPeAAAAAObwed5vv0+90gAAAAAAAAAAAAAAAAAP/xAAxEAABBAIBAgUDAwMFAQAAAAAEAQIDBQYHMAAREhMUIEAQFzEVFiEyNlAkQUJRYHH/2gAIAQEAAQgA/wDWk3VOH3UmTYWGQqvjdtPDGfj7t4j1HtTDXfmDYWGTdkaJc05nZRf8Efa1lbCsx9rt+hG7sr7HbWVFd0GOv7ywVVM7J37+7sn56Bv7yvVFDrttZUL2Qmo3BQkdmWFfa1llAkwPzL7MKGgZ/rr3bl2b44qwkokuZ05PQ4xBMiRjga3zE1EcgmmLR/ZS4tK1MfZCE0/ibE/lNRYh0/T2KKxVSXSlVIrkHL0vas7qIfrfMQkVVIGIFkWMjoYokSZs41Bt68B7RWdBl9BkDE9F8i1t66pFeUflG2LI5Xj073vke6R6IqqjUo9ZZNaoySWo1NjILEeYGAEFF5QnCYCEbF5RdzqbGTUVwV7rHJ6nxvjVFRVarHvje2SPFdtWQCsHuKu2rbYNhYHxcy2BW46140Vze2l2YpVh1jGtbq6Rk5OP4ZQUDEUPnyDDMfv2KpmUazu6RHzj9Ut7aUhiFV+G7BrMiY0aX4ed7MQVZqyle98j3vfUU1lcmMDAxLWtXSpGSb8PLtaVV15hIVvTWVMY8Q9j3xva9mB7MQxYay8+DsPYiqs1PT9YlhtlkpSpFRUFZRBNDA+LfY/V3oLhD8uwyzxkvtN1rnYqtdDT3HPsvOlDSWkrOsIwcrJSlkkAADrhIRA+CeeAeJ0s9ntLEgVcyMndi/y0VN1XPQm7Hp/BNXtTEjlayWCeAiFk0PAeCHYBziF5xg5eMl+ZH1rLPFLSOktOXYGYNx2tSKB73ve578NxIrJbLykBBErw4AhODLdngVDpRK25yC4u5/NsfbTZBcUk6TV2I7Qr7d0YdnwHgCWAc4ZeZ4gXjNl5TmPex7Hs17mLMirFhI47W1Eqaws4q9ujLu0KsCqaoMubIYATH6IKhq4ABODYWxXzST1FLw682K6GSCouuC/oQL6qIALuagymsiQC6K6Mo7UawEqbQO2rRTxeLbGUKdYpTD9a1xNKWr9aVwbRy91YIlQFx6szBbMRag7g2XiKXVUpovWpcpUGyWmI4cvv2UFAYd0975HukfrTGEurxCSOA8yAAEs0i2sybWyLPI46mzJqbIQ8evOHPBFMH4NmYt+h3izwMe+N7ZI8QyCPIKAQ5eDbl9628jrIka5VRG4XQR0FAGIvBt60UTHYAmcuoLVSscnBfwZnj0d/jxYiK1yKqO1FfqDeyVkvvtbCGsrTT5iSZiyZyZ9ZUaWuTwSy8O5iVdfV4vNpgvy76xGXh2dRJU5QRJGKTMITATBVWMNnWAnQ+7cNp6WhGAZ1qWoQLGvVu4dtf3jLzalVf3jFxbZp0OxlTGdadt1JoSq93u23ZKXlbhkGHkKIhHiAEiCBGEi4dxi+Vkws3NpsdZMmKm4jhIjQSxJSB5BiJx5NR2aiZY0dfdfnLYXloYutwENzKrR3FuerWSsrbFnLpmtWGrs7F/FskBAcytESgOWvvKsxE9tyT6SmtC+k/Cd9Lho+0ty+O+qYbqksK6QiCYaeaCfjHgmJnhHgoKiKmpgK6Pi3SH4LWoL6X8L2pivWU9YV7dgzeThd45P++tLjtSnuJ149t4isJH6+Jx6mxN0s/wCvFce6B+9RUT/TXkyTYXSPX2bTf4cLP+mnmIzE3u5J4ICR5YJ86wYnGylng4cGwcnIyknngggGgjhh49xMY7E2KnWrH+PCwU9u2O/7NI+mpP7Pi5SRhih5RyMv1OWI+Uuiex8b3Rv9rGPke2NmI6pLKWMy9GGHFgjHH5Nt/wBnSfTU3f8AZ0Ht2pH4sLP+mnXsdib0XmvcTx+9avrrTS70VXVZOrczg7q37fZn0Nq3M5+yurNLv7o60pMToKJqKBzbgVGYkxv01YzwYWCvt2DAs+F3iJ/31pYnvUXEH+E3TN4Kiog+mvIvJwqkYvsuREMprMXpO/ZO+ljPBa24nIrmtRVU7NcVr1VpM+3cTi7ox256T/b70UvX3opevvRS9feil6+9FL0zc9J/yG29ikip5gGa4pYKjBmq1yIqce5y0faVAiL+F7Uo3pKasF91+CtfeWgfWtj0BzKrVeGxtK6rGcSdfbi/rhpLXI724eqnp/H44f8A7U5Je07kUCg3H/TDd1tnW2gzSgeHZB6G5laK2gBWwvKsPpPdtutUXK3EoMRIKRCREAXEaCKXF78y2KDQeYGJb3VnclqVYc9RdWdMWhVfhmxgL5GBF+88qMIEoyUgiQoiYiTUdb6vLGkr7tw1PqaEawZ1qW5Q3GPRv92wtiKAstTUOc5yq53wWuc1Uc3XexlOWKouPdtm3QHGfSN609VeloSj3+60robOrOBmKGmEJnGn1hepU5RBHJ7dkZp+iBoACqqqqq/DRVRUVNb5ql4IoB/t2beJa5PPFEKNMWTANBUVsNbWBAw+/btAoN7HZxIrkVFbhWQRX+PiFu+t9bD0lSVYE2dkXaWBRxfxauyLqrAY8SithrqpEsRvrmd+ygoDDEVXKqq7UdCpt5JZy8GX48y/oDAUex8b3xyazyhKS8Qcj67fyBSDxqWH4+nshUexIpZvrsrJ0urxRh2MfI9kceH0DKChEC4ts4uoFklyN1rPLkuar0RXRREQgs5MtifNYnlnTfHrj5q48Q6EUiIoUciLrZWWpS1ShDdanxdTrF1yRxW1YJbVpQBd7SmUdqVXl01uZTWQx4mPXoF9Vj2Armo5FauxsBfSzyWVd8fXeBuuZmWdi1qNajUyC9Coqyc8u5tzLmyJPLoqYy7tBq8WpqhaitFAF49g4YmQ1vmjvY9j3sfhmXF4zZea0A8SwCgMEliimifFLnuu5qZ0ljWfFwPXc1y6OwsooooYmRRHHCV4c5peZZaVktl5qsY+R7WM1/h7cdrVln5dm4IpiS3lX1g+cF40UsbwDw7ASAsNyNcioua6r8azH0EkUkUj45PgxRSSyMjjwvViR+Wffta1qIiHHCV4cxZmbZuVkhXlx9azwVQ0iu7Pn2NrpWumuKbrEczssZLVYaDIau8AaWB1lWD0uRx+ZNkuD32POe8jnxvB73IHNePi2D02OMR8PV7kFZRBOMPy3MrLJSu8vWvNdqqw3Fx8HO9ZIYs1pRvY9j3MfUXNlTGNLAxHZdVdIwU3pzWua5rsh1Zj1p45g7zXGU1HjeqoqOVq8KIquRqUmuMot/A9Mf1bQVasmMa1rWo1vWW7Kq6VJBQre5srkx5Z7GPke1jME1mgqw2d38PMtfVmRMcRFdUVpSGKLYdYxsu7pEYORj2a4/fRo0T6W2N0Nu1fX2Om6Kbu4E3TmQQ91FI1tmkCr3kxDKY+/j/bWRdR4hlUv9A2ts0IX+AtN5DN/JVdpyih7ONqsboahESv+l/mlBQscheT7Lu7pJBxuqWitLsxBa/DtfVuOMaTL8W0qa22EeIflOpbIBXkU72Pje6N6KqKjkotnZPU+COSm2zjBqNYYGeEdF5onCZYBgwrIVcbYxkFFaHebNya1R8cSqqqrlYx8j2xx4vqexOVhFzV1FdUCtFB+Rf4hQX7F9bf6ivAfHLWEikiTOgJ6HJIFkSQcDZGYgoiIJui1Z2QsfdNQvZZ2bgxNzGoq7dxDpdw4oxF7S7pqY/5gL3PaP7oIfsfMDUVqkEkFSLIR0MKSXM2Aah1Hdm+GWzoMPoaBieh+ZYVVZZQLCdb6foSVc6vsdS5UL3UY6gvK9VQzunft7u6d+3QNBeWCogddqXKilRSanT9CN2efX1NbWwJED/giqWnM8SFTa9wubxK92qcNk79vtNiH56ZqzDG/mPXuGQqngGpacPsgv8A63//xABHEAACAQICBQYKBQsEAwEAAAABAgMABBEhBTAxQWEQEhNRUnEgIiNAQmJygZGhQ2OCkqIUM1NUg5SxssHR0jRQYJMkMnTi/9oACAEBAAk/AP8AlulLSHDtyqprTUB4IDJ/LV9K3swPU9z+7tV9MvfA9abgB9fGP+YVpO0mx7Eyk/7Hew26AZGRguPcDtNW096w/Yx0YLJPq057fF60pdTcGlbD4DAUB4QrSl1DwWVsPgSRRgvE+sTmN8Uq1msm7WHTJV9DcJ1xuGw7wNh89ux0uGKwR+NIfdUYsYe3k81TyTStteRizfMnkgkmk7Mal2+QNaLMCdc7iKtLW0XCNHk/jza0vdSewiJUl87cZhUd3+8VJfJ1YTCtL3Se2iPWlraXhIjR/wAOdWizOnagYS1BJDIPRkUo3zA5J5IZQcnjYq3yIqNb+Ht5RzVeATAYvBJ4sg93nN0kEK72PyAG00GtIP0/0zd3Yp2Z3OLMxJJPWSaBJJwAGZPACoRZQH058mPcldLfzfWHmR/dWraKCPsxoEHyw1VrFPH2ZEDD5g10tjL9WefH91qgF7AvpwZsO9KBBBwIORHAinZXQgqykggjeCKDXkH6cfnl7+3V2k8Tb1OzgRtB82wub/DKAHKPjKauWlf0BsRB1IvJjY2h9OQYyOPUSrQNPvuJcHk8wtAtxuuIsEkFA3toM+egwkQeunJctE+xhtRx1OtAW2kAM4ScpOMZ80lDT5rNdDMR8Ep2d2JLMxJJJzJJO81bNNK3uVB2mJ2Cgt5fdojGKI+ovmgWzvzmSBhHJ7a1bNDKNmOxx2lI2inZXUgqwJBBGYII3ipQJ8lhujkJPVfzKf1Lm5T5xoeTGK1QjprgjIcF62qAIu132vI3ac+bQB12o+x0PaQ0DLaOxENyBkeDdT8k/qW1y/yjc+YTYTsMLqZdsYPoDkLQ6PhYdNNvc9iOoVhgiUKiKNTMkUajN3IVR3k1cS3jjdAmK/fOFaDHfLP/AIVomz++9aE7zFP/AJiriWzc4ZTpgv3hjUySo2xkPOUjgRqYEmglXmujCi02j5nwhm3qew/JLjOowtJm2yAegdcwN/cqRCOwu+U0xZmJLMTiSScSSTtJrFLSHA3M3UDuHE1CIoYVCoi6lVu7wZMfoYjV7JN1IckTgqjIeFeyQdaDNH9pTkaC2d4clb6GQ6mBZYZkKujVjJaTYm2m6x1H1hTFWUgqwOBBBxBBG8UwF/bKBP642CQax+bDChZuttwUcTR8eVsl3Io2IO6lxlmbDHcijMueApcFQYu52yOdrHUzFYRilxcoc360Q6qYvCSFt7l9qdSOdSPFbNHGbI+5xSYSwthjudTmHHA03jxNmu51O1D30/OinQMOvqKtxXVv5CzOM/rzf2TkjwvrxQW6449yamXC6uUxldTnHCf6trJCbq1TGJyc5Yf8l1MeN9ZKSvXLHvTkfyF4cYPUm/8A3qsOmw6OBeuV8hTFnZiWY5kknEk8TSY2dlhI/U8m1F1LYQ28TSOeC0cZZ5C54bgo7hkNYcJYJA447ip7xkabnRTxLInc2eepTC0vsZE6kf01pyrowKsMiCDiCOIo+Ww6OdRulTJtS2MNiPH4zPQJJIAAzJJyAHE0B07DpbluuR9S2D30+B9iLM65zz7KfBfYlzGpA/KFHS256pEoEEEgg5EEZEHiKbyN8PE4TR6ggJbwvIePNzApudLNIzufWc40mMFiOnfiwyQao5Q2fP8AfK2uOU1mH98TapMIL0dOnBjk4pubLDIrofWQ40QY54UkA6udmR4b+Nez5+xDmeRcJb+UyfYTJdVutYMNdvtZgdUuMthKJPsP4rcjZ2c2XsTZjw2xSzgSP7T+OaGMk0ixp3ucKAEcESRr3IMNVsmsk/Cx12yGyb8bDVAFJ4njbucYGhhJDI0b96HCmwS8geP7SeOPDOPTXUrDu52AoYpAXnb9kNWP9PMYn7ptcv8AqJhEndDqxgs5ScftRR/M3UTHu52B8I4dBayv7wp5PorZIx3yPq8B08RCt1MM1NIUlico6ncynAjWIXllcIijezZCsxBEAzdpzmx1Yw6W2eM98b1xo49NaQv7yg8E7YAn32C8m17tF+4msj8nJgt2B6L7A+sjwjjxS0B3tsMms9C7dPc6cjZiEp9wlfB9Ka3H4+Ta99N8gBrIlkjlQo6sMQVbIig0ujZW8lJviP6N9UGj0bE3lJP0p7CVGsccahERRgAq5ADWDNL6H5hhyehNcD8fg/rUHJ+uXGtiSWKRSro4BUg0DPBtNqc5Y/Y7QpWR1ODKwII4EHwlZ3YgKqgkk9QAoGCDaLXZK/t9kVEsUUahURBgoA1v65b8n6zP4PozW5/HyehfTfMKdfYo0mGCzL4kq/aFaW7o7hf6pVjFOvXFOh+TYVoOf4pVjFCvXLMg+S41pXvjt1/q9WKJJhnM3jynvY685vfQ/IMeT0ppz+PwRmsAf7jBuT0LtG9zp/snp3bv7kTkGZgL/wDYS3griZbWVO7FDXUK+mtkf7j6wgADM7BWmLcMNqo3SN8ExoXk3sRYD8ZFaLvfwVom++MdaJvvjHWib74x1om++MdaJvvjHWjL38FC8h9qL/EmtMWxc+i7dGfg+FEEEbdZ9FbPIe+R66jWXQWkKe8KPC+hupVHdzsRRwWcvAf2o1V3HBENrOf4dZqyH/0Tj+VK0lPMOwWwQdyjAazSU8I7AbFD3qcRVkP/AKIP4slXcdxEd6H+PVqjikBSBf2Qr6a6iU93OxPhgcy9gST7SYoaOEkMiyJ3ocaIKTxJIvc4x1AW60hvT0Ivbq6eaQ7MclTgqjJfMLp4ZBtwzV+DKcmoLa6Q7HoS+xqCBHBE8jdyDE0cZJZGkfvc40BzLOB5PtP4i+GmdlPn7E2XI2MthKY/sPiy+HL/AOVsnuB9F6qevRJJJJJzJJzJJPmRIIIIIyIIzBBFS43OyC5P0vqP63hnCW/lEf2EzfkXx72fL2Ich4eaXELxk9XOyBpebLDIyOPWQ4U+EF6OgfgxzQ+FJhf3C7d8KdujicT89pJ80OBBHxGwg1Jjf2ybd8ydrwnxgsR0CcWGbml50s0iog9ZzhQAS3hSMH2cidQvkb4ePwmjokEEEEZEEZgjiKYdOq9FcDqkTwD4kKYhd7MclTvJp+fPO5d/7DgPNn5k8EgdOPA8DX/pMgJU7VYZMnuPgEdOw6K2HXI9EkkkknMknMk8TS4xWC+JxmfUgdNhz4H6pUzWkKurEMpyIIyIPEU+FnfYRydSP6DeA/krYCWfjI+wecP5K5BlhH1ibR4D42djjGnU8mx2pCzuwCqMySTgAOJrDpcOfOw3yvm2qTyF4cJvVm/s/I+N9ZqAeuWPc/IcI4o2d/ZQY0cZLiVpW7284OElvKsq/YpsY5Y0kT2XAbkkwvrxSF64o978ieQszhB6839k1aYwzoVPWOphxFL48TZNudTscd9PhLC2OG51ORQ8DTYq4weM7UcbVagCCDiKiJ0dI3joPoH/AMPOIiNHxt4iH6dgf5KGAAGA7qbxUGCINsjnYgpsZZmxw3IoyCDgKHjytm25FG1z3UnNhgQKvW28seJ1gH5faqTCe2NpjNIVZCQykYEEHAgg7xWL2k2AuYRvA3jiKmWWGVQyOtRq6OCrKwBDA5YGkaTRxJLx7Wg/unmyNHo8Zomxp/7JUaoiKFVFGAUDLAcBUwihhUs7tWMdpDiLaE7gd54mkLMxAVQMSSTgAAN5pQb+5UGY9hd0Q10WM6jG7hX0wPTXk50uj5mBmh3qe2lTrNDKoKOtDEEUgB2yWf8AWKkZHRiHRgQwI2gg+ZIzu7AIqgliTsAAqMM22Oz/AKy0MAB3AVOkMES853Y1zotHwtjDFvc9t+SHCdhjawttjB9M+YQevc2y/ORByeWtHIM1sTkfWXqergOuQdDk6N2XHJGYLoDBLlBg/wBrtCoOltd1zFmn2uz5hB0NrvuZRgn2e1SdNdkYPcyDF/s9kck4RdiIM3kbsoKPRWqE9Dbg5Di3W/JD69tbP8pHHmUQE+2e1GQk4pSlXUkMpBBBGRBB2EVctDKNpGxx2WB2iitnfHLAnCKT2G5ACCCCDntoGwuDviGMR70qz/KoR9Lb+P8AFdooYEbQciNUMSdgGZNWf5JAfpbjxPgu00DfzjfKMIx3JQAAAAAyGA5Ct5fDIqDjFGfXarlppTsx2IOyoGwUjMzEBVAJJJOAAA3mog0+TQ2u0R8X80IttIAZTAZScJBVs0T7VO1HHWjchN7ZjLmSHCRB6j1dhZ/St5MEl5dGwTntlAH9zLgavbm1PUcJkq9s7gcSYjWiGk4xSI9aCvvdCxrQt/8Au71oG+PfCwrRDR8ZXRKvbO3HAmU1e3N0eoYQpWjYID2wuL+9mxPLdgz7reLx5TWNjZn0IzjI49d+S2aV9rHYiDrdqwub/DOYjKPhGPNrRJ4m3MNnEEZg0WvIP0B/PL3dukZXQ4MrAgg9RBokEHEEZEcQanF7AvoT7R3PXS2M31o58f3lq6inj7Ubhh8idVcxQR72kcIPiaMt/L9WObH95qmFlA3oQZMe96JJJxJOZPEmkZnYgKqgkkncAKZrODdAPzz/AOFWqQRLuUbeJJ2nzmzAmAwSePxZB76kW/h7GSTVBJDKpzSRSrfMDknkhk7UbFG+RFaUM6dmdRLWibaXjG7R/wAedWh7qP2HR6jvk68YRUl3+71HfO3CEVoi6kPruiVom2i4yO8n8ObWlDAnVAoiqeSaQnNpGLt8yeSCSaU7I41LN8gakWwh7GTzVZjpcPGnk8aQ+/z2yhuEI2SJzsO4nYauZ7JuyfLJQgvE+rfmN8HrRd1DxaJsPiMRRHhEVou6m4rE2HxOAoQWSfWPz2+CVcz3rf8ATHVlDbR4bI0C49/X/sejLSbHtwqxrQkIPqYx/wApqxlXuncVBc/97VYyt7U71oWA8XJk/mrRdpDh2IVU/wDLv//Z";

type UserProps = {
  model: Partial<User> | null;
  noPhoto?: boolean;
};
const formatUserData = async ({
  model,
  noPhoto = false,
}: UserProps): Promise<Partial<User>> => {
  if (model === null) return {};

  let img;
  if (noPhoto == false) {
    try{
      if (fs.existsSync(`${process.cwd()}/upload/${model.photo}`)) {
        img = await sharp(`${process.cwd()}/upload/${model.photo}`)
          .resize({
            width: 200,
            height: 200,
          })
          .toBuffer();
        img = img.toString("base64");
      } else {
        img = imgPhotoDefault;
      }
    }
    catch(e:any){
      img = imgPhotoDefault;
    }
  }
  var userType: Partial<User> = {
    id: new Types.ObjectId(model.id),
    name: model.name,
    lastName: model.lastName,
    photo:
      noPhoto == false
        ? fs.existsSync(`${process.cwd()}/upload/${model.photo}`)
          ? fs.readFileSync(`${process.cwd()}/upload/${model.photo}`, {
              encoding: "base64",
            })
          : imgPhotoDefault
        : "",
    user: model.user,
    dateOfBirth: model.dateOfBirth,
    celphone: model.celphone,
    city: model.city ?? "",
    state: model.state ?? "",
    country: model.country ?? "",
    place: model.place ?? "",
    type: model.type ?? "",
    gender: model.gender ?? "",
    region: model.region ?? "",
    rol: model.rol,
    status: model.status,
    isAthlete: model.isAthlete ?? false,
    isCoach: model.isCoach ?? false,
    isJudge: model.isJudge ?? false,
    height: model.height ?? 0,
    weight: model.weight ?? 0,
    tshirtSize: model.tshirtSize ?? "",
    blood: model.blood ?? "",
    fran: model.fran ?? 0,
    sprint: model.sprint ?? 0,
    helen: model.helen ?? 0,
    run: model.run ?? 0,
    grace: model.grace ?? 0,
    filthy: model.filthy ?? 0,
    fightGoneBad: model.fightGoneBad ?? 0,
    murph: model.murph ?? 0,
    maxPullUps: model.maxPullUps ?? 0,
    cleanJerk: model.cleanJerk ?? 0,
    snatch: model.snatch ?? 0,
    deadlift: model.deadlift ?? 0,
    backSquat: model.backSquat ?? 0,
    benchPress: model.benchPress ?? 0,
    overheadSquat: model.overheadSquat ?? 0,
    facebook: model.facebook ?? "",
    instagram: model.instagram ?? "",
    twitter: model.twitter ?? "",
    folio: model.folio ?? "",
    coachAccepted: model.coachAccepted ?? false,
    judgeTest: model.judgeTest ?? false,
    coachTest: model.coachTest ?? false
  };
  return await userType;
};

const formatConstantData = (model: ConstantValue): Partial<ConstantValue> => {
  if (model === null) return {};

  var constantType: Partial<ConstantValue> = {
    id: model.id,
    code: model.code,
    value: model.value,
    description: model.description,
  };
  return constantType;
};

const formatDocumentData = (model: any): Partial<Document> => {
  if (model === null) return {};

  var documentType: Partial<Document> = {
    id: model.id,
    title: model.title,
    description: model.description,
    photo: fs.existsSync(`${process.cwd()}/upload/${model.photo}`)
      ? fs.readFileSync(`${process.cwd()}/upload/${model.photo}`, {
          encoding: "base64",
        })
      : "",
    file: model.file,
  };
  return documentType;
};

type UserLostProps = {
  model: User | null;
};
const formatUserLostData = ({ model }: UserLostProps): Partial<User> => {
  if (model === null) return {};

  var userLostType: Partial<User> = {
    id: model.id,
    name: model.name,
    lastName: model.lastName,
    photo: fs.existsSync(`${process.cwd()}/upload/${model.photo}`)
      ? fs.readFileSync(`${process.cwd()}/upload/${model.photo}`, {
          encoding: "base64",
        })
      : imgPhotoDefault,
    user: model.user,
    dateOfBirth: model.dateOfBirth,
    celphone: model.celphone,
    city: model.city,
    country: model.country,
    place: model.place,
    type: model.type,
    gender: model.gender,
    rol: model.rol,
    status: model.status,
  };
  return userLostType;
};

const formatCompetitionData = (model: any): Partial<Competition> => {
  if (!model || model === null) return {};
  var competitionType: Partial<Competition> = {
    id: model._id,
    name: model.name,
    description: model.description,
    location: model.location,
    cost: model.cost,
    startDate: model.startDate,
    endDate: model.endDate,
    by: model.by,
    facebookUrl: model.facebookUrl,
    instagramUsername: model.instagramUsername,
    twitterUsername: model.twitterUsername,
    image: fs.existsSync(`${process.cwd()}/upload/competitions/${model.image}`)
      ? fs.readFileSync(`${process.cwd()}/upload/competitions/${model.image}`, {
          encoding: "base64",
        })
      : `${process.cwd()}/upload/competitions/${model.image}`,
    bgImage: fs.existsSync(
      `${process.cwd()}/upload/competitions/${model.bgImage}`
    )
      ? fs.readFileSync(
          `${process.cwd()}/upload/competitions/${model.bgImage}`,
          {
            encoding: "base64",
          }
        )
      : `${process.cwd()}/upload/competitions/${model.bgImage}`,
    user: model.user,
    typeCompetence: model.typeCompetence,
    categoriesSupported: model.categoriesSupported,
    typeEvent: model.typeEvent,
    publicationDate: model.publicationDate,
    withDiscount: model.withDiscount,
    discount: model.discount,
    discountCode: model.discountCode,
    limitInscriptionDate: model.limitInscriptionDate,
    limitQualificationDate: model.limitQualificationDate,
    playbookDoc: model.playbookDoc ?? "",
    scordcardDoc: model.scordcardDoc ?? "",
    additionalDoc1: model.additionalDoc1 ?? "",
    additionalDoc2: model.additionalDoc2 ?? "",
    registered: model.registered ?? false,
    registeredAsJudge: model.registeredAsJudge ?? false,
    registeredAsAthlete: model.registeredAsAthlete ?? false,
    registeredAs: model.registeredAs ?? "",
    registeredCategory: model.registeredCategory ?? "",
    registeredTypeAthlete: model.registeredTypeAthlete ?? "",
    registeredPlace: model.registeredPlace ?? 0,
    registeredScore: model.registeredScore ?? 0,
    status: model.status,
    bonus: model.bonus,
    canRegistered: model.canRegistered,
    region: formatRegionData(model.region ?? null),
    competitionSteps:
      model.competitionSteps?.map((itemStep: any) => {
        return formatCompetitionStepsData(itemStep);
      }) ?? [],
  };
  return competitionType;
};

const formatCompetitionStepsData = (model: any): Partial<CompetitionSteps> => {
  if (model === null) return {};
  var competitionStepType: Partial<CompetitionSteps> = {
    id: model._id,
    name: model.name,
    start: model.start,
    end: model.end,
  };
  return competitionStepType;
};

const formatCompetitionUserData = async (
  model: any,
  type: string = ""
): Promise<Partial<CompetitionUser>> => {
  if (model === null) return {};
  var competitionType: Partial<CompetitionUser> = {};
  competitionType.id = model._id;
  competitionType.fullName =
    (model.user?.name ?? "") + " " + (model.user?.lastName ?? "");
  competitionType.years = model.years;
  competitionType.amount = model.amount;
  competitionType.category = `${model.category ?? ""} ${model.typeAthlete ?? "AVANZADO"} ${model.user?.gender ?? "---"}`;
  competitionType.typeAthlete = model.typeAthlete ?? "AVANZADO";
  competitionType.registeredAs = model.registeredAs ?? "atleta";
  competitionType.place = model.place ?? 0;
  competitionType.points = model.points ?? 0;
  competitionType.createdAt = model.createdAt;
  competitionType.hasTest =
    model.competitionUserTest?.length == 0 ? null : (model.competitionUserTest?.length >= 3 ? true : false);
  competitionType.user = await formatUserData({ model: model.user });
  competitionType.competition = formatCompetitionData(model.competition);
  competitionType.competitionUserTest =
    model.competitionUserTest?.filter((f:any) => f.status == Status.ACTIVO ).map((itemTest: any) => {
      return formatCompetitionUserTestData(itemTest);
    }) ?? [];

  if (type && type == "judge") {
    competitionType.judgeStatus = model.judgeStatus ?? "pendiente";
    competitionType.judgeUser = model.judgeUser
      ? await formatUserData({ model: model.judgeUser, noPhoto: false })
      : {};
    competitionType.competitionUserTest =
      model.competitionUserTest?.filter((f:any) => f.status == Status.ACTIVO ).map((itemTest: any) => {
        return formatCompetitionUserTestData(itemTest, type);
      }) ?? [];
  }
  competitionType.userTest = model.userTest;
  competitionType.testName = model.testName;
  competitionType.carril = model.carril;

  return competitionType;
};

const formatRegionData = (model: any): Partial<Region> => {
  if (model === null) return {};
  var competitionStepType: Partial<Region> = {
    id: model._id,
    name: model.name,
    description: model.description,
  };
  return competitionStepType;
};

const formatCompetitionUserTestData = (
  model: any,
  type: string = ""
): Partial<CompetitionUserTest> => {
  if (model === null) return {};
  var competitionUserTestType: Partial<CompetitionUserTest> = {};
  competitionUserTestType.id = model._id;
  competitionUserTestType.competitionUser = model.competitionUser;
  competitionUserTestType.testType = model.testType ?? "";
  competitionUserTestType.url = model.url ?? "";
  competitionUserTestType.files = model.files ?? [];
  competitionUserTestType.time = model.time ?? "";
  competitionUserTestType.reps = model.reps ?? 0;
  competitionUserTestType.weight = model.weight ?? 0;
  competitionUserTestType.status = model.status;
  competitionUserTestType.isValid = model.isValid ?? true;
  competitionUserTestType.isPending = model.isPending ?? false;
  competitionUserTestType.competitionTest = model.competitionTest;
  competitionUserTestType.points = model.points;
  competitionUserTestType.place = model.place;
  if (type == "judge") {
    competitionUserTestType.judgeTime = model.judgeTime ?? "";
    competitionUserTestType.judgeReps = model.judgeReps ?? 0;
    competitionUserTestType.judgeWeight = model.judgeWeight ?? 0;
    competitionUserTestType.judgeObservation = model.judgeObservation ?? "";
    competitionUserTestType.qualificationDate = model.qualificationDate;
  }

  return competitionUserTestType;
};

const formatTestData = (model: any): Partial<Test> => {
  if (model === null) return {};
  var testType: Partial<Test> = {};
  testType.id = model._id;
  testType.name = model.name;
  testType.minApproval = model.minApproval ?? 0;
  testType.numQuestions = model.numQuestions ?? 0;
  testType.questionTest = model.questionTest?.map((question: any) => {
    return formatQuestionTestData(question);
  }) ?? [];
  return testType;
};

const formatQuestionTestData = (model: any): Partial<QuestionTest> => {
  if (model === null) return {};
  var questionTestType: Partial<QuestionTest> = {};
  questionTestType.id = model._id;
  questionTestType.question = model.question ?? "";
  questionTestType.type = model.type ?? "";
  questionTestType.option1 = model.option1 ?? "";
  questionTestType.option2 = model.option2 ?? "";
  questionTestType.option3 = model.option3 ?? "";
  questionTestType.option4 = model.option4 ?? "";
  questionTestType.option5 = model.option5 ?? "";
  questionTestType.toolTip = model.toolTip ?? "";
  return questionTestType;
};

const formatUserTestData = (model: any, test?: Partial<Test>): Partial<TestUser> => {
  if (model === null) return {};
  var testUserType: Partial<TestUser> = {};
  testUserType.id = model._id;
  testUserType.test = test ? formatTestData(test) : model.test;
  testUserType.statusTest = model.statusTest;
  testUserType.statusPhysicalTest = model.statusPhysicalTest;
  testUserType.score = model.score;
  testUserType.presentedDate = model.presentedDate;
  testUserType.limitDate = model.limitDate;
  testUserType.validationDate = model.validationDate;
  return testUserType;
};

const formatCoachUserData = (model: any): Partial<CoachUser> => {
  if (model === null) return {};
  var testUserType: Partial<CoachUser> = {};
  testUserType.id = model._id;
  testUserType.user = model.user;
  testUserType.comment = model.comment;
  testUserType.aceppted = model.aceppted;
  testUserType.status = model.status;
  return testUserType;
};

const formatPaymentData = (model: any): Partial<Payment> => {
  if (model === null) return {};
  var testUserType: Partial<Payment> = {};
  testUserType.id = model._id;
  testUserType.user = model.user;
  testUserType.cardName = model.cardName ?? "";
  testUserType.cardNumber = model.cardNumber ?? "";
  testUserType.amount = model.amount ?? 0;
  testUserType.authorization = model.authorization ?? "";
  testUserType.reference = model.reference ?? "";
  testUserType.description = model.description ?? "";
  testUserType.date = model.date ?? new Date(1970,1,1);
  return testUserType;
};

//ELIMNAR-------
type CompetenceProps = {
  model: Partial<Competence> | null;
};
const formatCompetenceData = ({
  model,
}: CompetenceProps): Partial<Competence> => {
  if (model === null) return {};

  var competenceType: Partial<Competence> = {
    id: model.id,
    name: model.name,
    description: model.description,
    madeBy: model.madeBy,
    startDate: model.startDate,
    endDate: model.endDate,
    status: model.status,
    places: model.places,
    active: model.active,
    userId: model.userId,
  };
  return competenceType;
};

type CompetenceUserProps = {
  model: Partial<CompetenceUser> | null;
  competence?: Partial<Competence>;
  user?: Partial<User>;
};
const formatCompetenceUserData = ({
  model,
  competence,
  user,
}: CompetenceUserProps): Partial<CompetenceUser> => {
  if (model === null) return {};

  var competenceUserType: Partial<CompetenceUser> = {
    id: model.id,
    competenceId: model.competenceId,
    userId: model.userId,
    years: model.years,
    amount: model.amount,
    category: model.category,
    typeAthlete: model.typeAthlete,
    createdAt: model.createdAt,
    competence: competence,
    user: user,
  };
  return competenceUserType;
};

export {
  formatUserData,
  formatConstantData,
  formatDocumentData,
  formatUserLostData,
  formatCompetitionData,
  formatCompetitionUserData,
  formatRegionData,
  formatCompetitionUserTestData,
  formatTestData,
  formatQuestionTestData,
  formatUserTestData,
  formatCoachUserData,
  formatPaymentData,
  //ELIMINAR
  formatCompetenceUserData,
  formatCompetenceData,
};
