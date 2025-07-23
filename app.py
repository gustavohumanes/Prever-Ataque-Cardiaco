print(f"app.py: __name__ = {__name__}")

def func():
    print("Função func() dentro de app.py foi chamada")

if __name__ == "__main__":
    print("app.py está sendo executado diretamente")
    func()
else:
    print("app.py foi importado como módulo")